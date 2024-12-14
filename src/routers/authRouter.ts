import { Router } from 'express';
import { validateLogin, validateLogout, validateRefreshAccessToken } from '../validations/authValidation';
import { Login, Logout, refreshAccessToken } from '../controllers/authController';
import { handleValidationErrors } from '../middleware/handleValidationErrors';


const router = Router();

router.post('/login', validateLogin, handleValidationErrors, Login);
router.post('/logout', validateLogout, handleValidationErrors, Logout);
router.post('/refresh', validateRefreshAccessToken, handleValidationErrors, refreshAccessToken);

export default router;