"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateAddUser = exports.passwordValidator = exports.usernameValidator = void 0;
const express_validator_1 = require("express-validator");
const usernameValidator = () => (0, express_validator_1.body)("username")
    .isString()
    .trim()
    .notEmpty();
exports.usernameValidator = usernameValidator;
const emailValidator = () => (0, express_validator_1.body)("email")
    .isString()
    .trim()
    .isEmail()
    .notEmpty();
// refactor this to enforce stronger passwords later
const passwordValidator = () => (0, express_validator_1.body)("password")
    .isString()
    .trim()
    .notEmpty();
exports.passwordValidator = passwordValidator;
exports.validateAddUser = [
    (0, exports.usernameValidator)(),
    emailValidator(),
    (0, exports.passwordValidator)()
];
exports.validateUpdateUser = [
    (0, exports.usernameValidator)().optional(),
    emailValidator().optional(),
    (0, exports.passwordValidator)().optional()
];
