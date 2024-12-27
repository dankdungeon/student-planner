import { AuthResponse, LoginRequest } from '../types/AuthResponse';
import { UserResponse } from '../types/User.types';
import { Request, Response } from 'express';
import { passwordValidation } from '../utils/hashing';
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from '../utils/tokenGeneration';
import { successResponse, errorResponse } from '../utils/response';
import { getAuthenticatedUser } from '../utils/getAuthenticatedUser';
import { UserModel } from '../models/User.model';

export const Login = async (req: Request, res:Response): Promise<void> => { 
    try {
        const { username, password }: LoginRequest = req.body;
        
        // validate user
        const user = await UserModel.findOne({ username })
        if (!user)
            throw new Error("User does not exist");

        // validate password
        const isValid: boolean = await passwordValidation(password, user.password);
        if (!isValid)
            throw new Error('Invalid password');

        const userResponse: UserResponse = { userId: user.userId, username: user.username };
        const newAccessToken: string = await generateAccessToken(userResponse);
        const newRefreshToken: string = await generateRefreshToken(userResponse);
        const authResponse: AuthResponse = { user: userResponse, accessToken: newAccessToken } // store access token in memory
        
        // generates cookie for refresh token to be stored in
        await setRefreshTokenCookie(res, newRefreshToken);

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

export const Logout = async (req: Request, res: Response): Promise<void> => {
    try {
        // clear cookie with refresh token
        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0
        })

        successResponse(res, req.user, "Logged out successfully", 200);
    }
    catch (error) {
        errorResponse(res, "Failed to log out", 403);
    }
}

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = getAuthenticatedUser(req);

        // generate new token 
        const newAccessToken = await generateAccessToken(user);

        const authResponse: AuthResponse = { user, accessToken: newAccessToken };
        successResponse(res, authResponse, "refreshed access token successfully");
    }
    catch (error) {
        if (error instanceof Error) 
            errorResponse(res, error.message, 403);
        else
            errorResponse(res, "failed to refresh access token", 403);
    }
}