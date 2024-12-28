import { Request, Response } from 'express';
import { TaskResponse, AddTaskRequest, UpdateTaskRequest } from '../types/Task';
import { generateUUID } from '../utils/uuid';
import { successResponse, errorResponse } from '../utils/response';
import { TaskModel } from '../models/Task.model';
import { getAuthenticatedUser } from '../utils/getAuthenticatedUser';
import "express";

// CRUD operations
export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = getAuthenticatedUser(req);  

        const tasks = await TaskModel.find({ userId: user.userId });
        successResponse(res, tasks, "User's tasks successfully retrieved.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 401);
        else
            errorResponse(res, "Failed to get user's tasks.", 500);
    }
}

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, task, className, priority, dueDate }: AddTaskRequest = req.body;
        const user = getAuthenticatedUser(req);

        const newUUID = await generateUUID();
        const newTask = new TaskModel({
            taskId: newUUID,
            userId: user.userId,
            title,
            description,
            task,
            className,
            priority,
            dueDate: new Date(dueDate),
            status: 'pending'
        })

        await newTask.save();

        const taskResponse: TaskResponse = {
            ...newTask.toObject(),
            dueDate: newTask.dueDate.toISOString()
        }
        
        successResponse(res, taskResponse, "Task added successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else
            errorResponse(res, "Failed to add task.", 500);
    }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskId } = req.params;
        const { title, description, task, className, priority, status, dueDate }: UpdateTaskRequest = req.body;
        const user = getAuthenticatedUser(req);

        const updates = {
            ...(title && { title }),
            ...(description && { description }),
            ...(task && { task }),
            ...(className && { className }),
            ...(priority && { priority }),
            ...(status && { status }),
            ...(dueDate && { dueDate: new Date(dueDate) })
        }

        const updatedTask = await TaskModel.findOneAndUpdate(
            { taskId, userId: user.userId },
            { $set: updates },
            { new: true }
        );

        if (!updatedTask)
            throw new Error("Failed to find and update task.");

        const taskResponse: TaskResponse = { 
            ...updatedTask.toObject(), 
            dueDate: updatedTask.dueDate.toISOString() 
        }

        successResponse(res, taskResponse, "Updated task successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else
            errorResponse(res, "Failed to update task.", 500);
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskId } = req.params;
        const user = getAuthenticatedUser(req);

        const deletedTask = await TaskModel.findOneAndDelete({ taskId, userId: user.userId });
        if (!deletedTask)
            throw new Error("Failed to find and delete task.");

        const taskResponse: TaskResponse = { 
            ...deletedTask.toObject(), 
            dueDate: deletedTask.dueDate.toISOString() };

        successResponse(res, taskResponse , "Deleted task successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else
            errorResponse(res, "Failed to delete task.", 500);
    }
}