/**
 * Import Dependencies
 */
import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { GAuth } from '../../../../controllers/v1/gauth';
import { GDrive } from '../../../../controllers/v1/gdrive';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.get('/:email', async (req: Request, res: Response) => {
    try {
        const oauth2client = await new GAuth().fetchAuthToken(req.params.email);
        const list = await new GDrive(oauth2client).listFiles();
        res.json({
            list,
        });
    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});

/**
 * Export Module
 */
export default router;
