/**
 * This file contains the functional code
 * pertaining to google people api
 */

/**
 * Module Dependencies
 */
import { google, people_v1 } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { get as _get } from 'lodash';

export class GPeople {
    private service: people_v1.People;

    constructor(private oauth2Client: OAuth2Client) {
        this.service = google.people({
            auth: oauth2Client,
            version: 'v1',
        });
    }

    public getClientDetails(): Promise<people_v1.Schema$Person> {
        return new Promise((resolve, reject) => {
            this.service.people
                .get({
                    auth: this.oauth2Client,
                    personFields: 'names,emailAddresses',
                    resourceName: 'people/me',
                })
                .then(({ data }) => {
                    resolve(data);
                })
                .catch((e: Error) => reject(e));
        });
    }

    public findPrimaryEmailAddress(data: people_v1.Schema$Person): Promise<string | null> {
        return new Promise((resolve, reject) => {
            const { emailAddresses = [] } = data;
            if (!emailAddresses.length) {
                reject(null);
            }

            const emailObj = emailAddresses.find(item => {
                return _get(item, 'metadata.primary', false) === true;
            });

            if (emailObj) {
                resolve(`${emailObj.value}`);
            }

            resolve(`${emailAddresses[0].value}`);
        });
    }
}
