import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types/User.types';

interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
    
})