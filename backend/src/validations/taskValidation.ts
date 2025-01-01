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

const classIdValidator = () =>
    body("classId")
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
    .isIn(['pending', 'in-progress', 'completed'])
    .notEmpty()

const dueDateValidator = () =>
    body("dueDate")
    .isISO8601()
    .trim()
    .notEmpty()

export const validateAddTask = [
    titleValidator(),
    descriptionValidator().optional(),
    taskValidator(),
    classIdValidator(),
    priorityValidator().optional(),
    dueDateValidator()
]

export const validateUpdateTask = [
    taskIdValidator(),
    titleValidator().optional(),
    descriptionValidator().optional(),
    classIdValidator(),
    priorityValidator().optional(),
    statusValidator().optional(),
    dueDateValidator().optional()
]

export const validateDeleteTask = [
    taskIdValidator()
]