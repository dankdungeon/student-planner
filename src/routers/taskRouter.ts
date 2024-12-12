import { Router } from 'express';
import { getAllTasks, addTask, updateTask, deleteTask } from '../controllers/taskController'
import { validateAddTask, validateUpdateTask, validateDeleteTask } from '../validations/taskValidation';
import { handleValidationErrors } from '../middleware/handleValidationErrors';
const router = Router();

// REST methods on the router, calls the controller
router.get('/get', getAllTasks);
router.post('/add', validateAddTask, handleValidationErrors, addTask);
router.put('/update/:id', validateUpdateTask, handleValidationErrors, updateTask);
router.delete('/delete/:id', validateDeleteTask, handleValidationErrors, deleteTask);

export default router;