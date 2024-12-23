import { Router } from 'express';
import { validateLogin } from '../validations/authValidation';
import { Login, Logout, refreshAccessToken } from '../controllers/authController';
import { handleValidationErrors } from '../middleware/handleValidationErrors';
import { authAccessToken, authRefreshToken } from '../middleware/authentication'

const router = Router();

router.post('/login', validateLogin, handleValidationErrors, Login);
router.post('/logout', [ authAccessToken, authRefreshToken ], Logout);
router.post('/refresh', authRefreshToken, refreshAccessToken);

export default router;