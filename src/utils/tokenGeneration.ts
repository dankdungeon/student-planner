import jwt from 'jsonwebtoken';
import { UserResponse } from '../types/User.types';
import { AuthResponse } from '../types/AuthResponse';
import { CookieOptions, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const accessKey: string = process.env.JWT_ACCESS_SECRET || '123';
const refreshKey: string = process.env.JWT_REFRESH_SECRET || '123';

export const generateAccessToken = async (user: UserResponse): Promise<string> => {
    return jwt.sign(user, accessKey, { expiresIn: "15m" })
}

export const generateRefreshToken = async (user: UserResponse): Promise<string> => {
    return jwt.sign(user, refreshKey, { expiresIn: '7d' })
}

// want to make it async for consistency, wrap it in a promise
export const setRefreshTokenCookie = async (res: Response, refreshToken: string): Promise<void>  => {
    const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }; 
    return new Promise((resolve, reject) => {
        try {
            res.cookie('refreshToken', refreshToken, options);
            resolve();
        }
        catch (error) {
            reject(error);
        }
    })
}
