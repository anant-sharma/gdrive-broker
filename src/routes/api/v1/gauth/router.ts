/**
 * Import Dependencies
 */
import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { GAuth } from '../../../../controllers/v1/gauth';
import { Redis } from '../../../../datasources/redis';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const url = await new GAuth().getAuthUrl();
        res.redirect(url);
    } catch (e) {
        res.status(400).json({
            error: e,
        });
    }
});

router.get('/oauth2callback', async (req: express.Request, res: express.Response) => {
    const { code } = req.query;
    const gAuth = new GAuth();

    try {
        const tokens = await gAuth.getTokens(code);
        gAuth.setCredentials(tokens);
        res.status(200).json({
            oauth2Client: gAuth.oauth2Client,
        });

        /**
         * Add Entry in Redis
         */
        const redis = new Redis();
        redis.set(uuidv4(), JSON.stringify(gAuth.oauth2Client));
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
