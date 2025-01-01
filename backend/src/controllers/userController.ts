import { Request, Response } from 'express';
import { UserResponse, UserRequest } from '../types/User.types';
import { hashPassword } from '../utils/hashing';
import { generateUUID } from '../utils/uuid';
import { successResponse , errorResponse } from '../utils/response';
import { getAuthenticatedUser } from '../utils/getAuthenticatedUser';
import { UserModel } from '../models/User.model';
import "express";


// CRUD operations
export const getCurrentUser =  async (req: Request, res: Response): Promise<void> => {
    try {
        const user = getAuthenticatedUser(req);

        const userProfile = await UserModel.findOne(
            { userId: user.userId },
            { password: 0 } // sanitize password
        )

        if (!userProfile)
            throw new Error("Unable to find user.")

        successResponse(res, userProfile, "User found successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error) {
            errorResponse(res, error.message, 404);
        }
        else 
            errorResponse(res, "Failed to get user.", 500);
    }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password }: UserRequest = req.body;

        // check if username or email already used
        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            throw new Error("Username or email already exists.");
        }

        const hashedPassword = await hashPassword(password);
        const newUUID = await generateUUID();

        const newUser = new UserModel({
            userId: newUUID,
            username,
            email,
            password: hashedPassword,
            tasks: []
        })

        await newUser.save();

        const userResponse: UserResponse = {
            userId: newUUID,
            username
        }

        successResponse(res, userResponse, "Added user successfully.", 201);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 400);
        else
            errorResponse(res, "Failed to add user.", 400);
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = getAuthenticatedUser(req);
        const { username, email, password }: UserRequest = req.body;

        const hashedPassword = password ? await hashPassword(password) : undefined;

        // check if new username or email conficts with existing user
        if (username || email) {
            const existingUser = await UserModel.findOne({
                userId: { $ne: user.userId }, // not current user
                $or: [
                    ...(username ? [{ username }] : []), // checks username and email
                    ...(email ? [{ email }] : [])
                ]
            });
            if (existingUser) {
                throw new Error("Username or email already taken.");
            }
        }

        const updates = {
            ...(username && { username }),
            ...(email && { email }),
            ...(password && { password: hashedPassword })
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { userId: user.userId },
            { $set: updates},
            { new: true }
        )

        if (!updatedUser)
            throw new Error("Failed to find and update user.");

        const userResponse: UserResponse = {
            userId: updatedUser.userId,
            username: updatedUser.username
        }

        successResponse(res, userResponse, "Updated user successfully", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else 
            errorResponse(res, "Failed to update user.", 400);
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = getAuthenticatedUser(req);

        const deletedUser = await UserModel.findOneAndDelete({ userId: user.userId })
        if (!deletedUser)
            throw new Error("Failed to delete user.");

        const userResponse: UserResponse = {
            userId: deletedUser.userId, 
            username: deletedUser.username 
        };

        successResponse(res, userResponse, "Deleted user successfully.", 200);
    }
    catch (error) {
        if (error instanceof Error)
            errorResponse(res, error.message, 404);
        else
            errorResponse(res, "Failed to delete user.", 400);
    }
}

