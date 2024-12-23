import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { errorResponse } from '../utils/response';
import { UserResponse } from '../types/User.types'; 

dotenv.config({ path: '../../.env'})

// authenticate access token with verify

// store refresh token with cookie

// we can make jwt.verify async by wrapping it with a promise
// you need a callback function to make jwt.verify async
export const verifyToken = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        })
    })
}

export const authAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader: string | undefined = req.headers['authorization'];
    
        if (!authHeader) 
            throw new Error("Authorization header is missing");
        

        const token: string = authHeader.split(' ')[1];
        if (!token) 
            throw new Error("Token is missing form authorization header");
        
        const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET || '696969';
        const userPayload: UserResponse = await verifyToken(token, JWT_ACCESS_SECRET);

        // from express/index.d.ts
        // we extend the request from express to optionally include user as userResponse so we can access userId
        req.user = userPayload;
        
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) 
            errorResponse(res, "Access token has expired", 401);
        else if (error instanceof jwt.JsonWebTokenError) 
            errorResponse(res, error.message, 403);
        else if (error instanceof Error) 
            errorResponse(res, error.message, 403);
        else
            errorResponse(res, "Authentication failed", 403);
    }
}

export const authRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken: string | undefined = req.cookies?.refreshToken;
        if (!refreshToken)
            throw new Error("No refresh token provided"); 

        const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || '696969';
        const userPayload: UserResponse = await verifyToken(refreshToken, JWT_REFRESH_SECRET);

        req.user = userPayload;
        next();
    }
    catch (error) {
        if (error instanceof Error) 
            errorResponse(res, error.message, 401);
        else
            errorResponse(res, "Invalid or expired refreshToken", 401);
    }
}
