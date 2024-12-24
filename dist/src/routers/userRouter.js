"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validations/userValidation");
const handleValidationErrors_1 = require("../middleware/handleValidationErrors");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
// REST METHODS
router.get('/get', userController_1.getAllUsers); // not going to be here after database, or something else
router.post('/add', userValidation_1.validateAddUser, handleValidationErrors_1.handleValidationErrors, userController_1.addUser);
router.put('/update', userValidation_1.validateUpdateUser, handleValidationErrors_1.handleValidationErrors, authentication_1.authAccessToken, userController_1.updateUser);
router.delete('/delete', authentication_1.authAccessToken, userController_1.deleteUser);
exports.default = router;
