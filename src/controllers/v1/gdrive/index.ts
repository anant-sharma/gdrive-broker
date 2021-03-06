/**
 * This file contains the code required
 * to setup google drive interactions.
 */
import * as fs from 'fs-extra';
import { drive_v3, google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';

export class GDrive {
    private service: drive_v3.Drive;

    constructor(private oauth2Client: OAuth2Client) {
        this.service = google.drive({
            auth: oauth2Client,
            version: 'v3',
        });
    }

    public listFiles() {
        return new Promise(async (resolve, reject) => {
            const list = await this.service.files
                .list({
                    fields: 'nextPageToken, files(id, name)',
                    pageSize: 10,
                })
                .catch(e => {
                    reject(e);
                    console.trace(e);
                });

            resolve(list);
        });
    }

    public async upload(file: any) {
        const fileMetadata = {
            name: 'photo.jpg',
        };
        const media = {
            body: fs.createReadStream(file.path),
            mimeType: 'image/jpeg',
        };
        const uploadedFile = await this.service.files
            .create({
                fields: 'id',
                media,
            })
            .catch(e => {
                console.trace(e);
            });

        return uploadedFile;
    }
}
