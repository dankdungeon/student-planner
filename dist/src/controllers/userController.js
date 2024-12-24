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
exports.deleteUser = exports.updateUser = exports.addUser = exports.getAllUsers = exports.users = void 0;
const hashing_1 = require("../utils/hashing");
const uuid_1 = require("../utils/uuid");
const response_1 = require("../utils/response");
exports.users = []; // in mem storage
// CRUD operations
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(exports.users);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to get users", 500);
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield (0, hashing_1.hashPassword)(password);
        const newUUID = yield (0, uuid_1.generateUUID)();
        const newUser = {
            userId: newUUID,
            username,
            email,
            password: hashedPassword,
            tasks: []
        };
        const userResponse = {
            userId: newUUID,
            username
        };
        exports.users.push(newUser);
        (0, response_1.successResponse)(res, userResponse, "Added user successfully", 201);
    }
    catch (error) {
        (0, response_1.errorResponse)(res, "Failed to add user", 400);
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId)
            throw new Error("user not found");
        const { username, email, password } = req.body;
        const userIndex = exports.users.findIndex(user => user.userId === userId);
        if (userIndex === -1) {
            (0, response_1.errorResponse)(res, "User not found", 404);
            return;
        }
        // hash the password
        const hashedPassword = password ? yield (0, hashing_1.hashPassword)(password) : undefined;
        exports.users[userIndex] = Object.assign(Object.assign(Object.assign(Object.assign({}, exports.users[userIndex]), (username && { username })), (email && { email })), (password && { password: hashedPassword }));
        const userResponse = {
            userId: exports.users[userIndex].userId,
            username: exports.users[userIndex].username
        };
        (0, response_1.successResponse)(res, userResponse, "Updated user successfully", 200);
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 404);
        else
            (0, response_1.errorResponse)(res, "could not update user", 400);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId)
            throw new Error("user not found");
        const userIndex = exports.users.findIndex(user => user.userId === userId);
        if (userIndex === -1) {
            (0, response_1.errorResponse)(res, "User not found", 400);
            return;
        }
        const [deletedUser] = exports.users.splice(userIndex, 1);
        const userResponse = { userId: deletedUser.userId, username: deletedUser.username };
        (0, response_1.successResponse)(res, userResponse, "Deleted user successfully", 200);
    }
    catch (error) {
        if (error instanceof Error)
            (0, response_1.errorResponse)(res, error.message, 404);
        else
            (0, response_1.errorResponse)(res, "User not found", 400);
    }
});
exports.deleteUser = deleteUser;
