import { AuthResponse } from '../types/AuthResponse';
import { users } from './userController';
import { UserResponse } from '../types/User.types';
import { Request, Response } from 'express';
import { passwordValidation } from '../utils/hashing';
import { generateTokens } from '../utils/tokenGeneration';
/*
implement login, logout, token refreshing
*/

// login, pass back an auth response with an access token and a refresh token

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

        const userResponse: UserResponse = { userId: user.userId, username: user.username }
        const authResponse: AuthResponse = await generateTokens(userResponse)

        res.status(200).json(authResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User not found')
                res.status(404).json({ error: error.message });
            else if (error.message === 'Invalid password')
                res.status(403).json({ error: error.message });
            else
                res.status(500).json({ error: 'Internal server error' });
        }

    }
}
