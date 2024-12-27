import { Request } from 'express';
import { UserResponse } from '../types/User.types';

export const getAuthenticatedUser = (req: Request): UserResponse => {
    const user = req.user;
    if (!user)
        throw new Error("user not logged in");

    return user;
}