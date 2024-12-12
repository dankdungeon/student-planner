import { UserResponse } from './User.types'
export interface AuthResponse {
    user: UserResponse;
    jwtToken: string;
}