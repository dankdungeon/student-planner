import { UserResponse } from './User.types'

export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LogoutRequest {
    refreshToken: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}