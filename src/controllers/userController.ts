import { Request, Response } from 'express';
import { User, UserResponse, UserRequest } from '../types/User.types';
import { hashPassword } from '../utils/hashing';
import { generateUUID } from '../utils/uuid';
import { successResponse , errorResponse } from '../utils/response';

export let users: User[] = []; // in mem storage

// CRUD operations
export const getAllUsers =  async (req: Request, res: Response): Promise<void> => {
    try {
        res.json(users);
    }
    catch (error) {
        errorResponse(res, "Failed to get users", 500);
    }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password }: UserRequest = req.body;

        const hashedPassword = await hashPassword(password);
        const newUUID = await generateUUID();

        const newUser: User = {
            userId: newUUID,
            username,
            email,
            password: hashedPassword
        }
        const userResponse: UserResponse = {
            userId: newUUID,
            username
        }
        users.push(newUser);
        successResponse(res, userResponse, "Added user successfully", 201);
    }
    catch (error) {
        errorResponse(res, "Failed to add user", 400);
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string | undefined = req.user?.userId;
        if (!userId)
            throw new Error("user not found");

        const { username, email, password }: UserRequest = req.body;
    
        const userIndex = users.findIndex(user => user.userId === userId);
        if (userIndex === -1) {
            errorResponse(res, "User not found", 404);
            return;
        }
        
        // hash the password
        const hashedPassword = password ? await hashPassword(password) : undefined;

        users[userIndex] = { // update this
            ...users[userIndex],
            ...(username && { username }),
            ...(email && { email }),
            ...(password && { password: hashedPassword })
        }
        const userResponse: UserResponse = {
            userId: users[userIndex].userId,
            username: users[userIndex].username
        }
        successResponse(res, userResponse, "Updated user successfully", 200);

    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else 
            errorResponse(res, "could not update user", 400);
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string | undefined = req.user?.userId;
        if (!userId)
            throw new Error("user not found");

        const userIndex = users.findIndex(user => user.userId === userId);
        if (userIndex === -1) {
            errorResponse(res, "User not found", 400);
            return;
        }
    
        const [deletedUser] = users.splice(userIndex, 1);
        const userResponse: UserResponse = { userId: deletedUser.userId, username: deletedUser.username };
        successResponse(res, userResponse, "Deleted user successfully", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else
            errorResponse(res, "User not found", 400);
    }
}

