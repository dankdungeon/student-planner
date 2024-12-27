export interface User {
    userId: string;
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    userId: string;
    username: string;
}

export interface UserRequest {
    username: string;
    email: string;
    password: string;
}

