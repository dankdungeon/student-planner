import { Request, Response } from 'express';
import { User, UserResponse, AuthResponse } from '../types/User.types';
import { hashPassword, passwordValidation } from '../utils/hashing';
import { generateToken } from '../middleware/authentication';
import { generateUUID } from '../utils/uuid';

let users: User[] = []; // in mem storage

// CRUD operations
export const getAllUsers =  async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await hashPassword(password);
        const newUUID = await generateUUID();

        const newUser: User = {
            userId: newUUID,
            username,
            email,
            password: hashedPassword
        }
        const newSanitizedUser: UserResponse = {
            userId: newUUID,
            username
        }
        users.push(newUser);
        res.status(201).json(newSanitizedUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add user' })
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { username, email, password } = req.body;
    
        const userIndex = users.findIndex(user => user.userId === userId);
        if (userIndex === -1) {
            res.status(404).json({ error: 'User not found'});
            return;
        }
        
        // hash the password
        const hashedPassword = await hashPassword(password);

        users[userIndex] = { // update this
            ...users[userIndex],
            ...(username && { username }),
            ...(email && { email }),
            ...(password && { password: hashedPassword })
        }
        const newSanitizedUser: UserResponse = {
            userId: users[userIndex].userId,
            username: users[userIndex].username
        }
        res.status(200).json(newSanitizedUser); 
    }
    catch (error) {
        res.status(400).json({ error: 'User not found'});
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const userIndex = users.findIndex(user => user.userId === userId);
        if (userIndex === -1) {
            res.status(404).json({ error: 'User not found'});
            return;
        }
    
        const deletedUser = users.splice(userIndex, 1);
        res.status(200).json(deletedUser[0]);
    }
    catch (error) {
        res.status(400).json({ error: 'User not found '});
    }
}

// Authentication logic
export const userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);

        if (!user) 
            throw new Error('User not found.');

        const isValid: boolean = await passwordValidation(password, user.password);
        if (!isValid) 
            throw new Error('Invalid password');

        const userResponse: UserResponse = { userId: user.userId, username: user.username }
        const authResponse: AuthResponse = generateToken(userResponse); 
        
        res.status(200).json(authResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User not found') {
                res.status(404).json({ error: error.message });
            } else if (error.message === 'Invalid password') {
                res.status(403).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
        else {
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}