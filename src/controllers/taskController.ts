import { Request, Response } from 'express';
import { Task } from '../types/Task';
import { generateUUID } from '../utils/uuid';

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
    res.status(201).json(newTask); // 201 == created successful response
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { title, description, task, className, priority, status, dueDate } = req.body;

    const taskIndex = tasks.findIndex(task => task.taskId === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' });
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

    res.status(200).json(tasks[taskIndex]);
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const taskIndex = tasks.findIndex(task => task.taskId === taskId);
    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json(deletedTask[0]);
}