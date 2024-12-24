"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getAllTasks = void 0;
const uuid_1 = require("../utils/uuid");
const response_1 = require("../utils/response");
const userController_1 = require("./userController");
let tasks = []; // in memory storage
// CRUD operations
const getAllTasks = (req, res) => {
    res.json(tasks);
};
exports.getAllTasks = getAllTasks;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, task, className, priority, dueDate } = req.body;
        const user = req.user;
        if (!user)
            throw new Error("no user to associate task with");
        const userId = user.userId;
        const newUUID = yield (0, uuid_1.generateUUID)();
        const newTask = {
            taskId: newUUID,
            userId,
            title,
            description: description || undefined,
            task,
            className: className || undefined,
            priority: priority || undefined,
            status: 'pending',
            dueDate: new Date(dueDate),
        };
        tasks.push(newTask);
        // associate task id with user
        const userIndex = userController_1.users.findIndex(user => user.userId === userId);
        if (userIndex === -1)
            throw new Error("user not found");
        userController_1.users[userIndex].tasks.push(newUUID);
        const taskResponse = Object.assign(Object.assign({}, newTask), { dueDate: newTask.dueDate.toISOString() });
        (0, response_1.successResponse)(res, taskResponse, "Added tasks successfully", 201);
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 404);
        else
            (0, response_1.errorResponse)(res, "failed to add task", 400);
    }
});
exports.addTask = addTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { title, description, task, className, priority, status, dueDate } = req.body;
        const taskIndex = tasks.findIndex(task => task.taskId === taskId);
        if (taskIndex === -1) {
            (0, response_1.errorResponse)(res, "Task not found", 404);
            return;
        }
        // check for user ownsership
        // match userId from payload to userId from task
        const user = req.user;
        if (!user)
            throw new Error("user not logged in");
        // check if user owns task
        const userIndex = userController_1.users.findIndex(u => u.userId === user.userId);
        if (userIndex === -1)
            throw new Error("user not found");
        const taskExists = userController_1.users[userIndex].tasks.some(t => t === taskId);
        if (!taskExists)
            throw new Error("user doesnt own task");
        tasks[taskIndex] = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, tasks[taskIndex]), (title && { title })), (description && { description })), (task && { task })), (className && { className })), (priority && { priority })), (status && { status })), (dueDate && { dueDate: new Date(dueDate) }));
        const taskResponse = Object.assign(Object.assign({}, tasks[taskIndex]), { dueDate: tasks[taskIndex].dueDate.toISOString() });
        (0, response_1.successResponse)(res, taskResponse, "Updated task successfully", 200);
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 404);
        else
            (0, response_1.errorResponse)(res, "failed to update task", 400);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const taskIndex = tasks.findIndex(task => task.taskId === taskId);
        if (taskIndex === -1)
            throw new Error("task not found");
        // check for user ownsership
        // match userId from payload to userId from task
        const user = req.user;
        if (!user)
            throw new Error("user not logged in");
        // check if user owns task
        const userIndex = userController_1.users.findIndex(u => u.userId === user.userId);
        if (userIndex === -1)
            throw new Error("user not found");
        const taskExists = userController_1.users[userIndex].tasks.some(t => t === taskId);
        if (!taskExists)
            throw new Error("user doesnt own task");
        // remove taskid from user
        userController_1.users[userIndex].tasks = userController_1.users[userIndex].tasks.filter(t => t !== taskId);
        const [deletedTask] = tasks.splice(taskIndex, 1);
        const taskResponse = Object.assign(Object.assign({}, deletedTask), { dueDate: deletedTask.dueDate.toISOString() });
        (0, response_1.successResponse)(res, taskResponse, "Deleted task successfully", 200);
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 404);
        else
            (0, response_1.errorResponse)(res, "failed to delete task", 400);
    }
});
exports.deleteTask = deleteTask;
