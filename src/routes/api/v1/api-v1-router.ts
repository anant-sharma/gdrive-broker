/**
 * Import Dependencies
 */
import * as express from 'express';
/**
 * Import Routes
 */
import clockRouter from './clock/router';
import gAuthRouter from './gauth/router';
import gDriveRouter from './gdrive/router';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Bind Routes
 */
router.use('/clock', clockRouter);
router.use('/gauth', gAuthRouter);
router.use('/gdrive', gDriveRouter);

/**
 * Export Module
 */
export default router;
