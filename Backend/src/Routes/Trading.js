import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { tradeHandler } from '../controllers/tradeHandler.js';

const router = express.Router();

router.get('/', verifyToken, tradeHandler);

export default router;
