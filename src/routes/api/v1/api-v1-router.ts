/**
 * Import Dependencies
 */
import * as express from 'express';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Import Routes
 */
import clockRouter from './clock/router';
import gAuthRouter from './gauth/router';

/**
 * Bind Routes
 */
router.use('/clock', clockRouter);
router.use('/gauth', gAuthRouter);

/**
 * Export Module
 */
export default router;
