import { UserResponse } from "../User.types";

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserResponse;
    }
}

export {};