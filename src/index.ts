import express from 'express';
import taskRouter from './routers/taskRouter';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env'});
const PORT = process.env.PORT
const app = express();

// parse JSON requests
app.use(express.json()); 


// mounting routers
app.use('/task', taskRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Deployment
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});