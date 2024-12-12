import { Response } from 'express';

interface SuccessResponse {
    success: true;
    message: string;
    data: any;
}

interface ErrorResponse {
    success: false;
    error: {
        message: string;
    }
}

// send a success response
export const successResponse = (res: Response, data: any, message: string = '', statusCode: number = 200): Response => {
    const response: SuccessResponse = {
        success: true,
        message,
        data
    }
    return res.status(statusCode).json(response);
}

// send an error response
export const errorResponse = (res: Response, error: string, statusCode: number = 400): Response => {
    const response: ErrorResponse = {
        success: false,
        error: {
            message: error
        }
    }
    return res.status(statusCode).json(response);
}