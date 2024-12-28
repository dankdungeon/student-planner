import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initializeIndexes } from '../utils/initializeIndexes';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student-planner") 
        console.log("MongoDB connection established");
        await initializeIndexes(); // set up indexes
    }
    catch (error) {
        console.log("MongoDB failed to connect: ", error);
        process.exit(1); // terminate the whole program, critical failure
    }
}