/**
 * This file contains the code required to
 * perform JWT operations.
 */
import * as jwt from 'jsonwebtoken';

export class JWT {
    public static decode(token: string): any {
        return jwt.decode(token);
    }
}
