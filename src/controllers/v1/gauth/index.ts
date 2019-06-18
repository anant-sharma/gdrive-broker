/**
 * This file contains the functional code
 * pertaining to google oauth
 */

/**
 * Module Dependencies
 */
import { google } from 'googleapis';
import { googleKeys } from '../../../config/config';

export class GAuth {
    public oauth2Client: any;

    private scopes = ['https://www.googleapis.com/auth/drive.appfolder', 'https://www.googleapis.com/auth/drive.file'];

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
}
