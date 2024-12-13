import { body, param } from 'express-validator';

// define validation chains as functions so that
// they are instances when called, so they are not mutable
const taskIdValidator = () =>
    param("taskId")
    .isString()
    .trim()
    .notEmpty()

const userIdValidator = () => 
    body("userId")
    .isString()
    .trim()
    .notEmpty()

const titleValidator = () => 
    body("title")
    .isString()
    .trim()
    .notEmpty()

const descriptionValidator = () => 
    body("description")
    .isString()
    .trim()
    .notEmpty()

const taskValidator = () =>
    body("task")
    .isString()
    .isIn(['assignment', 'project', 'exam'])
    .notEmpty()

const classNameValidator = () =>
    body("className")
    .isString()
    .trim()
    .notEmpty()

const priorityValidator = () =>
    body("priority")
    .isString()
    .isIn(['low', 'medium', 'high'])
    .notEmpty()

const statusValidator = () =>
    body("status")
    .isString()
    .isIn(['pending', 'in-progess', 'completed'])
    .notEmpty()

const dueDateValidator = () =>
    body("dueDate")
    .isISO8601()
    .trim()
    .notEmpty()

export const validateAddTask = [
    userIdValidator(),
    titleValidator(),
    descriptionValidator().optional(),
    taskValidator(),
    classNameValidator().optional(),
    priorityValidator().optional(),
    dueDateValidator()
]

export const validateUpdateTask = [
    taskIdValidator(),
    titleValidator().optional(),
    descriptionValidator().optional(),
    classNameValidator().optional(),
    priorityValidator().optional(),
    statusValidator().optional(),
    dueDateValidator().optional()
]

export const validateDeleteTask = [
    taskIdValidator()
]