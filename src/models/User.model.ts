import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types/User.types';

export interface UserDocument extends User, Document {}

const UserSchema: Schema<UserDocument> = new Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true, autoIndex: false })

UserSchema.index({ username: 1, email: 1 });

export const UserModel = mongoose.model('User', UserSchema);