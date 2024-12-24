"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const userValidation_1 = require("./userValidation");
exports.validateLogin = [
    (0, userValidation_1.usernameValidator)(),
    (0, userValidation_1.passwordValidator)()
];
