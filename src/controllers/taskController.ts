import { Request, Response } from 'express';
import { Task } from '../types/Task';
import { generateUUID } from '../utils/uuid';
import { successResponse, errorResponse } from '../utils/response';

let tasks: Task[] = []; // in memory storage

// CRUD operations
export const getAllTasks = (req: Request, res: Response): void => {
    res.json(tasks);
}

export const addTask = async (req: Request, res:Response): Promise<void> => {
    const { userId, title, description, task, className, priority, dueDate } = req.body;

    const newUUID = await generateUUID();
    const newTask: Task = {
        taskId: newUUID,
        userId,
        title,
        description: description || undefined,
        task,
        className: className || undefined,
        priority,
        status: 'pending',
        dueDate: new Date(dueDate),
    }
    tasks.push(newTask);
    successResponse(res, newTask, "Added tasks successfully", 201);
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { title, description, task, className, priority, status, dueDate } = req.body;

    const taskIndex = tasks.findIndex(task => task.taskId === taskId);
    if (taskIndex === -1) {
        errorResponse(res, "Task not found", 404);
        return;
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...(title && { title }),
        ...(description && { description }),
        ...(task && { task }),
        ...(className && { className }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
    }
    successResponse(res, tasks[taskIndex], "Updated task successfully", 200);
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const taskIndex = tasks.findIndex(task => task.taskId === taskId);
    if (taskIndex === -1) {
        errorResponse(res, "Task not found", 404);
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json(deletedTask[0]);
    successResponse(res, deletedTask[0], "Deleted task successfully", 200);
}