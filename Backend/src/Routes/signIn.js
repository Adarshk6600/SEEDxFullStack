import express from 'express'
import handleSignIn from '../controllers/handleSignIn.js'
const router = express.Router()
router.post('/', handleSignIn)
export default router;