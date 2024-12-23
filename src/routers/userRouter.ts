import { Router } from 'express';
import { getAllUsers, addUser, updateUser, deleteUser } from '../controllers/userController';
import { validateAddUser, validateUpdateUser, } from '../validations/userValidation';
import { handleValidationErrors } from '../middleware/handleValidationErrors';
import { authAccessToken } from '../middleware/authentication';
const router = Router();

// REST METHODS
router.get('/get', getAllUsers); // not going to be here after database, or something else
router.post('/add', validateAddUser, handleValidationErrors, addUser);
router.put('/update', validateUpdateUser, handleValidationErrors, authAccessToken, updateUser);
router.delete('/delete', authAccessToken, deleteUser);

export default router;