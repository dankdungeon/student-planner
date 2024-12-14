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
    .notEmpty()

const userIdValidator = () =>
    param("userId")
    .isString()
    .trim()
    .notEmpty()

export const validateAddUser = [
    usernameValidator(),
    emailValidator(),
    passwordValidator()
]

export const validateUpdateUser = [
    userIdValidator(),
    usernameValidator().optional(),
    emailValidator().optional(),
    passwordValidator().optional()
]

export const validateDeleteUser = [
    userIdValidator()
]