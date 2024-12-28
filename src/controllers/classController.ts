import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { getAuthenticatedUser } from '../utils/getAuthenticatedUser';
import { ClassModel } from '../models/Class.model';
import "express";
import { AddClassRequest, ClassResponse, UpdateClassRequest } from '../types/Class';
import { generateUUID } from '../utils/uuid';

// assume that UserResponse is sent with requests
// req.user because the user will be logged in, protected route
export const getUserClasses = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = getAuthenticatedUser(req);

        const classes = await ClassModel.find({ userId: user.userId })
        successResponse(res, classes, "User's tasks successfully retrieved.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 401);
        else
            errorResponse(res, "Failed to get user's classes.", 500);
    }
}

export const addClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, professor, start, end, location, days, semester }: AddClassRequest = req.body;
        const user = getAuthenticatedUser(req);

        const newUUID = await generateUUID();
        const newClass = new ClassModel({
            classId: newUUID,
            userId: user.userId,
            name,
            ...(professor && { professor }),
            ...(start && { start: new Date(start) }),
            ...(end && { end: new Date(end) }),
            ...(location && { location }),
            ...(days && { days }),
            ...(semester && { semester })
        })
         
        await newClass.save();

        const classResponse: ClassResponse = {
            ...newClass.toObject(),
            start: newClass.start ? newClass.start.toISOString() : "",
            end: newClass.end ? newClass.end.toISOString() : ""
        }

        successResponse(res, classResponse, "Class created successfully.", 201);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 400);
        else
            errorResponse(res, "Failed to create class.", 500);
    }
}

export const updateClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const { classId } = req.params;
        const { name, professor, start, end, location, days, semester }: UpdateClassRequest = req.body;
        const user = getAuthenticatedUser(req);

        const updates = {
            ...(name && { name }),
            ...(professor && { professor }),
            ...(start && { start }),
            ...(end && { end }),
            ...(location && { location }),
            ...(days && { days }),
            ...(semester && { semester })
        }

        const updatedClass = await ClassModel.findOneAndUpdate(
            { classId, userId: user.userId },
            { $set: updates },
            { new: true}
        )

        if (!updatedClass)
            throw new Error("Failed to find and update class.");

        const classResponse: ClassResponse = {
            ...updatedClass.toObject(),
            start: updatedClass.start ? updatedClass.start.toISOString() : "",
            end: updatedClass.end ? updatedClass.end.toISOString() : ""
        }

        successResponse(res, classResponse, "Updated task successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 401);
        else
            errorResponse(res, "Failed to update class.", 500);
    }
}

export const deleteClass = async (req: Request, res: Response): Promise<void> => {
    try {
        const { classId } = req.params;
        const user = getAuthenticatedUser(req);

        const deletedClass = await ClassModel.findOneAndDelete({ classId, userId: user.userId });
        if (!deletedClass)
            throw new Error("Failed to find and delete class.");

        const classResponse: ClassResponse = {
            ...deletedClass.toObject(),
            start: deletedClass.start ? deletedClass.start.toISOString() : null,
            end: deletedClass.end ? deletedClass.end.toISOString() : null
        }

        successResponse(res, classResponse, "Deleted class successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 401);
        else
            errorResponse(res, "Failed to delete class.", 500);
    }
}
