import mongoose, { Schema, Document } from 'mongoose';
import { Task } from '../types/Task';

interface TaskDocument extends Task, Document {}

export const TaskSchema: Schema<TaskDocument> = new Schema({
    taskId: { type: String, required: true, unique: true },
    userId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    task: { type: String, required: true,
        enum: ['assignment', 'project', 'exam']
     },
    className: { type: String },
    priority: { type: String,
        enum: ['low', 'medium', 'high']
     },
    status: { type: String, required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
     },
    dueDate: { type: Date, required: true }
}, { timestamps: true })

export const TaskModel = mongoose.model('Task', TaskSchema)