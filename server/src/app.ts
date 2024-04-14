import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import expressMongoSanitize from 'express-mongo-sanitize'
import userRouter from './routes/userRoute';
import 'dotenv/config'
import ErrorMiddleware, { notFoundHandler } from './middleware/ErrorMiddleware';

export const app = express()

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

app.use(helmet())
app.use(cookieParser())
app.use(expressMongoSanitize())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))


app.use('/api/user', userRouter)

app.use(notFoundHandler)
app.use(ErrorMiddleware)
