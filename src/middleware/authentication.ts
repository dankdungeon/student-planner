import jwt from 'jsonwebtoken';
import { UserResponse, AuthResponse } from '../types/User.types'
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env'})

export const generateToken = (user: UserResponse): AuthResponse => {
    const secretKey = process.env.JWT_SECRET || '696969';
    const options = {
        expiresIn: '1h',
    }

    const token: string = jwt.sign(user, secretKey, options);
    const authResponse: AuthResponse = { user: user, jwtToken: token }
    return authResponse;
}

