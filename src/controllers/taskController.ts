import { Request, Response } from 'express';
import { Task, TaskResponse, AddTaskRequest, UpdateTaskRequest } from '../types/Task';
import { generateUUID } from '../utils/uuid';
import { successResponse, errorResponse } from '../utils/response';
import { UserResponse } from '../types/User.types';

let tasks: Task[] = []; // in memory storage

// CRUD operations
export const getAllTasks = (req: Request, res: Response): void => {
    res.json(tasks);
}

export const addTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, task, className, priority, dueDate }: AddTaskRequest = req.body;
        const user: UserResponse | undefined = req.user;
        if (!user)
            throw new Error("no user to associate task with");

        const userId: string = user.userId;
        const newUUID = await generateUUID();
        const newTask: Task = {
            taskId: newUUID,
            userId,
            title,
            description: description || undefined,
            task,
            className: className || undefined,
            priority: priority || undefined,
            status: 'pending',
            dueDate: new Date(dueDate),
        }
        tasks.push(newTask);
        const taskResponse: TaskResponse = { ...newTask, dueDate: newTask.dueDate.toISOString() };
        successResponse(res, taskResponse, "Added tasks successfully", 201);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else
            errorResponse(res, "failed to add task", 400);
    }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { title, description, task, className, priority, status, dueDate }: UpdateTaskRequest = req.body;

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
    const taskResponse: TaskResponse = { ...tasks[taskIndex], dueDate: tasks[taskIndex].dueDate.toISOString() }
    successResponse(res, taskResponse, "Updated task successfully", 200);
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const taskIndex = tasks.findIndex(task => task.taskId === taskId);
    if (taskIndex === -1) {
        errorResponse(res, "Task not found", 404);
        return;
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    const taskResponse: TaskResponse = { ...deletedTask, dueDate: deletedTask.dueDate.toISOString() };
    successResponse(res, taskResponse , "Deleted task successfully", 200);
}