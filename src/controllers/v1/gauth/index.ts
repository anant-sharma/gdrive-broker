/**
 * This file contains the functional code
 * pertaining to google oauth
 */

/**
 * Module Dependencies
 */
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { JWT } from '../../../common/jwt';
import { googleKeys } from '../../../config/config';
import { Redis } from '../../../datasources/redis';

export class GAuth {
    private oauth2Client: OAuth2Client;
    private redis: Redis;

    private scopes = [
        // GDrive Scopes
        'https://www.googleapis.com/auth/drive.appfolder',
        'https://www.googleapis.com/auth/drive.file',

        // People API Scopes
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    constructor() {
        /**
         * Create a new OAuth2 client with the configured keys.
         */
        this.oauth2Client = new google.auth.OAuth2(
            googleKeys.web.client_id,
            googleKeys.web.client_secret,
            googleKeys.web.redirect_uris[0]
        );

        // Ref: https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens
        this.oauth2Client.on('tokens', (tokens: any) => {
            this.oauth2Client.setCredentials(tokens);
        });

        this.redis = new Redis();
    }

    public getAuthUrl() {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });
    }

    public getTokens(code: string) {
        return this.oauth2Client.getToken(code);
    }

    public setCredentials(tokens: any) {
        this.oauth2Client.credentials = tokens;
    }

    public handleOAuth2Callback(code: string): Promise<OAuth2Client> {
        return new Promise(async (resolve, reject) => {
            try {
                /**
                 * Fetch Tokens corresponding to provided code
                 */
                const { tokens } = await this.getTokens(code);

                /**
                 * Set Credentials in OAuth Client
                 */
                this.setCredentials(tokens);

                /**
                 * Get Client Email Address
                 */
                const { credentials: { id_token: token = null } = {} } = this.oauth2Client;

                if (token) {
                    const client = JWT.decode(token);
                    /**
                     * Add Entry in Redis
                     */
                    this.redis.set(client.email, JSON.stringify(this.oauth2Client)).catch(e => {
                        reject(e);
                        return;
                    });
                }

                resolve(this.oauth2Client);
            } catch (e) {
                reject(e);
            }
        });
    }
}
