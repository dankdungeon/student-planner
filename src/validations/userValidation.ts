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

export const passwordValidator = () =>
    body("password")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number");


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
