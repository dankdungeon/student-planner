import jwt from 'jsonwebtoken';
import { UserResponse } from '../types/User.types';
import { AuthResponse } from '../types/AuthResponse';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env'})

export const generateToken = (user: UserResponse): AuthResponse => {
    const secretKey = process.env.JWT_SECRET || '696969';
    const options = {
        expiresIn: '4h',
    }

    const token: string = jwt.sign(user, secretKey, options);
    const authResponse: AuthResponse = { user: user, jwtToken: token }
    return authResponse;
}

