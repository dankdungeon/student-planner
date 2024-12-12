import { Router } from 'express';
import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/userController';
import { validateAddUser, validateUpdateUser, validateDeleteUser } from '../validations/userValidation';
import { handleValidationErrors } from '../middleware/handleValidationErrors';

const router = Router();

// REST METHODS
router.get('/get', getAllUsers); // not going to be here after database, or something else
router.post('/add', validateAddUser, handleValidationErrors, addUser);
router.put('/update/:id', validateUpdateUser, handleValidationErrors, updateUser);
router.delete('/delete/:id', validateDeleteUser, handleValidationErrors, deleteUser);

export default router;