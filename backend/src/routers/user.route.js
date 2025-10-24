import express from 'express';
import { getUserAllUrls } from '../controllers/user.controller.js';
import wrapAsync from '../utils/tryCatch.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get("/urls",authMiddleware, wrapAsync(getUserAllUrls));


export default router;

