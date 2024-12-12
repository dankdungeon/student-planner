export interface User {
    userId: string;
    username: string;
    email: string;
    password: string;
    tasks?: string[]; // array of task ids
}

export interface UserResponse {
    userId: string;
    username: string;
}
