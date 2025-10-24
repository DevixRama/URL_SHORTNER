import express from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/auth.controller.js';
import wrapAsync from '../utils/tryCatch.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router();


router.post("/register", wrapAsync(registerUser));

router.post("/login", wrapAsync(loginUser));

router.post("/logout", authMiddleware, wrapAsync(logoutUser));

router.get("/me",authMiddleware, wrapAsync(getCurrentUser));



export default router;

