import mongoose, { Schema, Document } from 'mongoose';
import { Class } from '../types/Class';

export interface ClassDocument extends Class, Document {}

const ClassSchema: Schema<ClassDocument> = new Schema({
    classId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    professor: { type: String, default: ""},
    start: { type: String, default: "" },
    end: { type: String, default: "" },
    location: { type: String, default: "" },
    days: { type: [String], default: [] },
    semester: { type: String, default: "" }
}, { timestamps: true }); 

// write indexes later
export const ClassModel = mongoose.model('Class', ClassSchema);