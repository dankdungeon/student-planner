import { Router } from 'express';
import { getAllTasks, addTask, updateTask, deleteTask } from '../controllers/taskController'
import { validateAddTask, validateUpdateTask, validateDeleteTask } from '../validations/taskValidation';
import { handleValidationErrors } from '../middleware/handleValidationErrors';
import { authAccessToken } from '../middleware/authentication';
const router = Router();

// REST methods on the router, calls the controller
router.get('/get', getAllTasks);
router.post('/add', validateAddTask, handleValidationErrors, authAccessToken, addTask);
router.put('/update/:taskId', validateUpdateTask, handleValidationErrors, authAccessToken, updateTask);
router.delete('/delete/:taskId', validateDeleteTask, handleValidationErrors, authAccessToken, deleteTask);

export default router;