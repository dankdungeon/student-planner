import mongoose, { Schema, Document } from 'mongoose';
import { Class } from '../types/Class';

export interface ClassDocument extends Class, Document {}

const ClassSchema: Schema<ClassDocument> = new Schema({
    classId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    professor: { type: String, default: ""},
    start: { type: Date, default: null },
    end: { type: Date, default: null },
    location: { type: String, default: "" },
    days: { type: [String], default: [],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    semester: { type: String, default: "" }
}, { timestamps: true }); 

// write indexes later
export const ClassModel = mongoose.model('Class', ClassSchema);