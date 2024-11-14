import express from 'express';
import handleUserSignUp from '../controllers/handleUserSignUp.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/',handleUserSignUp);

export default router;
