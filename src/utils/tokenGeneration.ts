import jwt from'jsonwebtoken';
import { UserResponse } from '../types/User.types';
import { AuthResponse } from '../types/AuthResponse';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env'});
const accessKey: string = process.env.JWT_ACCESS_SECRET || '123';
const refreshKey: string = process.env.JWT_REFRESH_SECRET || '123';

export const generateAccessToken = async (user: UserResponse): Promise<string> => {
    return jwt.sign(user, accessKey, {expiresIn: "15m" })
}

export const generateRefreshToken = async (user: UserResponse): Promise<string> => {
    return jwt.sign(user, refreshKey, { expiresIn: '7d' })
}

export const generateTokens = async (user: UserResponse): Promise<AuthResponse> => {
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    return { 
        user: user as UserResponse,
        accessToken,
        refreshToken
    }
}