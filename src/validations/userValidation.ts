import { body, param } from 'express-validator';

export const usernameValidator = () => 
    body("username")
    .isString()
    .trim()
    .notEmpty()

const emailValidator = () => 
    body("email")
    .isString()
    .trim()
    .isEmail()
    .notEmpty()

    // refactor this to enforce stronger passwords later
export const passwordValidator = () =>
    body("password")
    .isString()
    .trim()
    .notEmpty()

export const validateAddUser = [
    usernameValidator(),
    emailValidator(),
    passwordValidator()
]

export const validateUpdateUser = [
    usernameValidator().optional(),
    emailValidator().optional(),
    passwordValidator().optional()
]
