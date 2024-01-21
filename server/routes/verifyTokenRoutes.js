
import { verifyToken, revirifyEmail } from "../controllers/verifyToken.js";
import express from 'express'
import {protect} from '../midllewares/authMiddlewere.js'
const router = express.Router()
router.route('/').post(verifyToken)
router.route('/reverification').post(protect, revirifyEmail)
export default router;