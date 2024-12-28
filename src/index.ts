import express from 'express';
import taskRouter from './routers/taskRouter';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import classRouter from './routers/classRouter'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import mongoose from 'mongoose';

// env variables
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middleware
// parse JSON requests
app.use(express.json()); 
// parse cookies
app.use(cookieParser());

// mounting routers
app.use('/task', taskRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/class', classRouter);

// connect to db
(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log("Failed to start server: ", error);
        process.exit(1);
    }
})();

// event listener for shutdown signal
process.on('SIGHUP', async () => {
    console.log('SIGHUP signal received: closing resources...');
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
});

