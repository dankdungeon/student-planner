"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const taskValidation_1 = require("../validations/taskValidation");
const handleValidationErrors_1 = require("../middleware/handleValidationErrors");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
// REST methods on the router, calls the controller
router.get('/get', taskController_1.getAllTasks);
router.post('/add', taskValidation_1.validateAddTask, handleValidationErrors_1.handleValidationErrors, authentication_1.authAccessToken, taskController_1.addTask);
router.put('/update/:taskId', taskValidation_1.validateUpdateTask, handleValidationErrors_1.handleValidationErrors, authentication_1.authAccessToken, taskController_1.updateTask);
router.delete('/delete/:taskId', taskValidation_1.validateDeleteTask, handleValidationErrors_1.handleValidationErrors, authentication_1.authAccessToken, taskController_1.deleteTask);
exports.default = router;
