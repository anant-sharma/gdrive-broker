/**
 * Import Dependencies
 */
import * as express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { GAuth } from '../../../../controllers/v1/gauth';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const url = await new GAuth().getAuthUrl();
        res.redirect(url);
    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});

router.get('/oauth2callback', async (req: Request, res: Response) => {
    try {
        const { code } = req.query;
        res.status(200).json({
            oauth2Client: new GAuth().handleOAuth2Callback(code),
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
