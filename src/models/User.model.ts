import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types/User.types';
import { TaskModel } from './Task.model';
import { ClassModel } from './Class.model';

export interface UserDocument extends User, Document {}

const UserSchema: Schema<UserDocument> = new Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true, autoIndex: false })

UserSchema.index({ username: 1, email: 1 });

// cascading deletion of tasks and classes
UserSchema.pre('findOneAndDelete', async function(next) {
    try {
        const userDoc = await this.model.findOne(this.getQuery());

        if (userDoc) {
            const session = await mongoose.startSession();

            try {
                await session.withTransaction(async () => {
                    await TaskModel.deleteMany({ userId: userDoc.userId }).session(session);
                    await ClassModel.deleteMany({ userId: userDoc.userId }).session(session);
                });
            }
            finally {
                session.endSession();
            }
        }
        next();
    }
    catch (error) {
        if (error instanceof Error)
            next(error);
        else
            next(new Error("Error deleting tasks and classes associated with user."))
    }
});

export const UserModel = mongoose.model('User', UserSchema);