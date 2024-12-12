import { UserResponse } from './User.types'

export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
}