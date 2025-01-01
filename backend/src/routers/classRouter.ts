import { Router } from 'express';
import { validateAddClass, validateDeleteClass, validateUpdateClass } from '../validations/classValidation';
import { getUserClasses, addClass, updateClass, deleteClass } from '../controllers/classController';
import { handleValidationErrors } from '../middleware/handleValidationErrors';
import { authAccessToken } from '../middleware/authentication'

const router = Router();

router.get('/get', authAccessToken, getUserClasses);
router.post('/add', authAccessToken, validateAddClass, handleValidationErrors, addClass);
router.put('/update/:classId', authAccessToken, validateUpdateClass, handleValidationErrors, updateClass);
router.delete('/delete/:classId', authAccessToken, validateDeleteClass, handleValidationErrors, deleteClass);

export default router;