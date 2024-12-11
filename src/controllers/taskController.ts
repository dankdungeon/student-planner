import { Router, Request, Response } from 'express';
import { Task } from '../types/Task';

let tasks: Task[] = []; // in memory storage

// get all tasks from in mem storage
export const getAllTasks = (req: Request, res: Response): void => {
    res.json(tasks);
}

export const addTask = (req: Request, res:Response): void => {
    const { title, description, task, className, priority, dueDate } = req.body;

    const newTask: Task = {
        id: Date.now().toString(),
        title,
        description: description || undefined,
        task,
        className: className || undefined,
        priority,
        status: 'pending',
        dueDate: new Date(dueDate),
    };
    tasks.push(newTask);
    res.status(201).json(newTask); // 201 == created successful response
}

export const updateTask = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { title, description, type, className, priority, status, dueDate } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...(title && { title }),
        ...(description && { description }),
        ...(type && { type }),
        ...(className && { className }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
    }

    res.status(200).json(tasks[taskIndex]);
}

export const deleteTask = (req: Request, res: Response): void => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }

    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json(deletedTask[0]);
}