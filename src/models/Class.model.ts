import mongoose, { Schema, Document } from 'mongoose';
import { Class } from '../types/Class';
import { TaskModel } from './Task.model';

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
}, { timestamps: true, autoIndex: false }); 

ClassSchema.index({ classId: 1, userId: 1 });

// cascading deletion of tasks associated with class
ClassSchema.pre('findOneAndDelete', async function(next) {
    try {
        const classDoc = await this.model.findOne(this.getQuery());

        if (classDoc) {
            const session = await mongoose.startSession();

            try {
                await session.withTransaction(async () => {
                    await TaskModel.deleteMany({ classId: classDoc.classId }).session(session)
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
            next(new Error("Error deleting tasks associated with class."))
    }
});

export const ClassModel = mongoose.model('Class', ClassSchema);