import { body, param } from 'express-validator';
// addtask
// updatetask
// deletetask
export const validateAddTask = [
    body('title')
    .isString().withMessage('Title must be a string')
    .trim()
    .notEmpty().withMessage('Title cannot be empty if provided'),

    body('description').optional()
    .isString().withMessage('Description must be a string')
    .trim(),

    body('task')
    .isString().withMessage('Task must be a string')
    .isIn(['assignment', 'project', 'exam']).withMessage('Invalid task type'),

    body('className').optional()
    .isString().withMessage('Class name must be a string')
    .trim(),

    body('priority')
    .isString().withMessage('Priority must be a string')
    .isIn(['low', 'medium', 'high']).withMessage('Invalid status'),

    body('dueDate').optional()
    .isISO8601().withMessage('Due date must be a valid date')

]

export const validateUpdateTask = [
    param('taskId').isString().notEmpty().withMessage('ID is required'),

    body('title').optional()
    .isString().withMessage('Title must be a string')
    .trim()
    .notEmpty().withMessage('Title cannot be empty if provided'),

    body('description').optional()
    .isString().withMessage('Description must be a string')
    .trim(),

    body('task').optional()
    .isString().withMessage('Task must be a string')
    .isIn(['assignment', 'project', 'exam']).withMessage('Invalid task type'),

    body('className').optional()
    .isString().withMessage('Class name must be a string')
    .trim(),

    body('priority').optional()
    .isString().withMessage('Priority must be a string')
    .isIn(['low', 'medium', 'high']).withMessage('Invalid status'),

    body('status').optional()
    .isString().withMessage('Status must be a string')
    .isIn(['pending', 'in-progess', 'completed']),

    body('dueDate').optional()
    .isISO8601().withMessage('Due date must be a valid date')
]

export const validateDeleteTask = [
    param('taskId').isString().notEmpty().withMessage('ID is required')
]