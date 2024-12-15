import { UserResponse } from "../User.types";

declare global {
    namespace Express {
        interface Request {
            user?: UserResponse;
        }
    }
}