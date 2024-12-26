import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types/User.types';

export interface UserDocument extends User, Document {}

const UserSchema: Schema<UserDocument> = new Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: String, required: true, ref: 'Task' }]
}, { timestamps: true })

// write indexes after i have a better understanding of the querying
// ill be doing

// make sure to disable autoindex before finish
// write an index initialization script 
export const UserModel = mongoose.model('User', UserSchema);