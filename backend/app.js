import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';


import connectToMongoDB from './src/config/mongo.config.js';
import shortUrlRouter from './src/routers/shortUrl.route.js';
import authRouter from './src/routers/auth.route.js';
import userRouter from './src/routers/user.route.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { directToLongUrl } from './src/controllers/shortUrl.controller.js';
import { attchUser } from './src/utils/attchUser.js';


// dotenv.config("./.env")
dotenv.config({ path: './.env' });


const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["PUT", "POST", "GET", "DELETE"],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(attchUser)


app.use('/api/user', userRouter)

app.use('/api/auth', authRouter)

app.use('/api/create', shortUrlRouter)

app.get('/:id', directToLongUrl );


app.use(errorHandler)


app.listen(port, () => {
    connectToMongoDB()
    console.log(`Example app listening on port ${port}`)
})
