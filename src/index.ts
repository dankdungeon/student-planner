import express from 'express';
import taskRouter from './routers/taskRouter';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import classRouter from './routers/classRouter'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';

// env variables
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middleware
// parse JSON requests
app.use(express.json()); 
// parse cookies
app.use(cookieParser());

// connect to db
connectDB();

// mounting routers
app.use('/task', taskRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/class', classRouter);

// Deployment
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});