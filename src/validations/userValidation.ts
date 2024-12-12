import { body, param } from 'express-validator';

export const validateAddUser = [
    body('username')
    .isString().notEmpty().withMessage('Username is required'),

    body('email')
    .isEmail().notEmpty().withMessage('Email is required'),

    body('password')
    .isString().notEmpty().isLength({ min: 6 }).withMessage('Password is required, must be at least 6 characters')
]

export const validateUpdateUser = [
    param('userId')
    .isString().notEmpty().withMessage('ID is required'),

    body('username')
    .isString().notEmpty().withMessage('Username is required'),

    body('email')
    .isEmail().notEmpty().withMessage('Email is required'),

    body('password')
    .isString().notEmpty().isLength({ min: 6 }).withMessage('Password is required, must be at least 6 characters')
]

export const validateDeleteUser = [
    param('userId')
    .isString().notEmpty().withMessage('ID is required')
]

export const validateUserLogin = [
    body('username')
    .isString().notEmpty().withMessage('Username is required'),

    body('password')
    .isString().notEmpty().withMessage('Password is required')
]