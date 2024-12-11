import { Router, Request, Response } from 'express';
import { Task } from '../types/Task';
import { getAllTasks, addTask, updateTask, deleteTask } from '../controllers/taskController'

const router = Router();

// REST methods on the router, calls the controller
router.get('/', getAllTasks);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;