import { UserResponse } from './User.types'

export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
