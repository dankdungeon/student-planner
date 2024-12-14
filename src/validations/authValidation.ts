import { body } from 'express-validator';
import { usernameValidator, passwordValidator } from './userValidation';

const refreshTokenValidator = () =>
    body("refreshToken")
    .notEmpty()
    .isJWT()

export const validateLogin = [
    usernameValidator(),
    passwordValidator()
]

export const validateLogout = [
    refreshTokenValidator()
]

export const validateRefreshAccessToken = [
    refreshTokenValidator()
]