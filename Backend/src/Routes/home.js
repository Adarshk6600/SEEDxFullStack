import express from 'express';
import {HomePage} from '../controllers/HomePage.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/',verifyToken, HomePage);

export default router;
