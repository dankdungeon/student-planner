import { AuthResponse } from '../types/AuthResponse';
import { users } from './userController';
import { UserResponse } from '../types/User.types';
import { Request, Response } from 'express';
import { passwordValidation } from '../utils/hashing';
import { generateAccessToken, generateRefreshToken, generateTokens } from '../utils/tokenGeneration';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response';

/*
implement login, logout, token refreshing
*/
// in mem storage for refresh tokens
const refreshTokens = new Set<string>();

export const Login = async (req: Request, res:Response): Promise<void> => {
    const { username, password } = req.body;

    // Validate credentials
    try {
        const user = users.find(u => u.username === username);
        if (!user)
            throw new Error('User not found');

        const isValid: boolean = await passwordValidation(password, user.password);
        if (!isValid)
            throw new Error('Invalid password');
        const userResponse: UserResponse = { userId: user.userId, username: user.username };
        const authResponse: AuthResponse = await generateTokens(userResponse);

        refreshTokens.add(authResponse.refreshToken);
        successResponse(res, authResponse, "Logged in successfully", 200);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User not found')
                errorResponse(res, error.message, 404);
            else if (error.message === 'Invalid password')
                errorResponse(res, error.message, 403);
            else
                errorResponse(res, error.message, 403);
        }
        else {
            errorResponse(res, "Failed to login", 403);
        }
    }
}

export const Logout = async(req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshTokens.has(refreshToken))
            throw new Error('Invalid or expired refresh token');

        refreshTokens.delete(refreshToken);
        successResponse(res, refreshToken, "Logged out successfully", 200);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Invalid or expired refresh token')
                errorResponse(res, error.message, 403);
            else
                res.status(403).json({ error: error.message });
                errorResponse(res, error.message, 403);
        }
        else        
            errorResponse(res, "Failed to log out", 403);
    }
}

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '123';
        const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as UserResponse;

        // generate new tokens
        const newAccessToken = await generateAccessToken(user);
        const newRefreshToken = await generateRefreshToken(user);
        
        // refresh the set
        refreshTokens.delete(refreshToken);
        refreshTokens.add(newRefreshToken);


        successResponse(res, {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        } , "Refreshed token successfully", 200);
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            errorResponse(res, error.message, 403);
        }
        else {
            errorResponse(res, "Authentication failed", 403);
        }
    }
}