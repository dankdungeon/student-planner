import mongoose, { Schema, Document } from 'mongoose';
import { Task } from '../types/Task';

export interface TaskDocument extends Task, Document {}

const TaskSchema: Schema<TaskDocument> = new Schema({
    taskId: { type: String, required: true, unique: true },
    userId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    task: { type: String, required: true,
        enum: ['assignment', 'project', 'exam']
     },
    classId: { type: String, required: true, ref: 'Class' },
    priority: { type: String,
        enum: ['low', 'medium', 'high']
     },
    status: { type: String, required: true,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
     },
    dueDate: { type: Date, required: true }
}, { timestamps: true, autoindex: false })

// make sure to disable autoindex before finish
// write an index initialization script 
TaskSchema.index({ userId: 1, taskId: 1 });

export const TaskModel = mongoose.model('Task', TaskSchema)