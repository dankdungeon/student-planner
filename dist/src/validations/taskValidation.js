"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteTask = exports.validateUpdateTask = exports.validateAddTask = void 0;
const express_validator_1 = require("express-validator");
// define validation chains as functions so that
// they are instances when called, so they are not mutable
const taskIdValidator = () => (0, express_validator_1.param)("taskId")
    .isString()
    .trim()
    .notEmpty();
const userIdValidator = () => (0, express_validator_1.body)("userId")
    .isString()
    .trim()
    .notEmpty();
const titleValidator = () => (0, express_validator_1.body)("title")
    .isString()
    .trim()
    .notEmpty();
const descriptionValidator = () => (0, express_validator_1.body)("description")
    .isString()
    .trim()
    .notEmpty();
const taskValidator = () => (0, express_validator_1.body)("task")
    .isString()
    .isIn(['assignment', 'project', 'exam'])
    .notEmpty();
const classNameValidator = () => (0, express_validator_1.body)("className")
    .isString()
    .trim()
    .notEmpty();
const priorityValidator = () => (0, express_validator_1.body)("priority")
    .isString()
    .isIn(['low', 'medium', 'high'])
    .notEmpty();
const statusValidator = () => (0, express_validator_1.body)("status")
    .isString()
    .isIn(['pending', 'in-progess', 'completed'])
    .notEmpty();
const dueDateValidator = () => (0, express_validator_1.body)("dueDate")
    .isISO8601()
    .trim()
    .notEmpty();
exports.validateAddTask = [
    userIdValidator(),
    titleValidator(),
    descriptionValidator().optional(),
    taskValidator(),
    classNameValidator().optional(),
    priorityValidator().optional(),
    dueDateValidator()
];
exports.validateUpdateTask = [
    taskIdValidator(),
    titleValidator().optional(),
    descriptionValidator().optional(),
    classNameValidator().optional(),
    priorityValidator().optional(),
    statusValidator().optional(),
    dueDateValidator().optional()
];
exports.validateDeleteTask = [
    taskIdValidator()
];
