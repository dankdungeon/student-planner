import { ClassModel } from '../models/Class.model';
import { TaskModel } from '../models/Task.model';
import { UserModel } from '../models/User.model';

export const initializeIndexes = async () => {
    try {
        console.log("Starting initialization of indexes...");

        // parallel execution
        await Promise.all([
            ClassModel.syncIndexes(),
            TaskModel.syncIndexes(),
            UserModel.syncIndexes()
        ])

        console.log("Indexes initialized.");

    }
    catch (error) {
        console.log("Indexes failed to initialize.", error);
        process.exit(1); 
    }
}