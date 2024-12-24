"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
// send a success response
const successResponse = (res, data, message = '', statusCode = 200) => {
    const response = {
        success: true,
        message,
        data
    };
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
// send an error response
const errorResponse = (res, error, statusCode = 400) => {
    const response = {
        success: false,
        error: {
            message: error
        }
    };
    return res.status(statusCode).json(response);
};
exports.errorResponse = errorResponse;
