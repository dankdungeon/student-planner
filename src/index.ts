import express from 'express';
import taskRouter from './routes/taskRouter';

const app = express();
const PORT = 3000;

// parse JSON requests
app.use(express.json()); 


// mounts router at '/api'
app.use('/tasks', taskRouter);


// Deployment
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});