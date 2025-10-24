import express from 'express';
import { createShortUrl , directToLongUrl } from '../controllers/shortUrl.controller.js';
import wrapAsync from '../utils/tryCatch.js';

const router = express.Router();

// Route to create a short URL
router.post("/",wrapAsync(createShortUrl))


export default router;