import { AuthResponse } from '../types/AuthResponse';
import { users } from './userController';
import { UserResponse } from '../types/User.types';
import { Request, Response } from 'express';
import { passwordValidation } from '../utils/hashing';
import { generateAccessToken, generateRefreshToken, generateTokens } from '../utils/tokenGeneration';
import jwt from 'jsonwebtoken';

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
        res.status(200).json(authResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User not found')
                res.status(404).json({ error: error.message });
            else if (error.message === 'Invalid password')
                res.status(403).json({ error: error.message })
            else
                res.status(403).json({ error: error.message });
        }
        else {
            res.status(403).json({ error: 'Failed to log in' });
        }
    }
}

export const Logout = async(req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshTokens.has(refreshToken))
            throw new Error('Invalid or expired refresh token');

        refreshTokens.delete(refreshToken);
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Invalid or expired refresh token')
                res.status(403).json({ error: error.message })
            else
                res.status(403).json({ error: error.message });
        }        
        res.status(403).json({ error: 'Failed to log out'});
        
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

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(403).json({ error: 'Refresh token expired' });
        }
        else {
            res.status(403).json({ error: 'Failed to refresh access token' });

        }
    }
}