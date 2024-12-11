import express, {Request, Response} from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes



// Deployment
app.listen(PORT, () => {
    console.log(`Server running at PORT:${PORT}`);
});