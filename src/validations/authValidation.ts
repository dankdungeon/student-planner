import { usernameValidator, passwordValidator } from './userValidation';

export const validateLogin = [
    usernameValidator(),
    passwordValidator()
]

