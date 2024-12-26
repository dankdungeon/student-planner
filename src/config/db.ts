import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student-planner") // same as local host
        console.log("MongoDB connection established");
    }
    catch (error) {
        console.log("MongoDB failed to connect: ", error);
        process.exit(1); // terminate the whole program, critical failure
    }
}