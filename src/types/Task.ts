export interface Task {
    taskId: string; 
    userId: string;
    title: string; 
    description?: string; 
    task: 'assignment' | 'project' | 'exam';
    className?: string;
    priority?: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progess' | 'completed';
    dueDate: Date; // uses Date object
}

export interface TaskResponse {
    taskId: string;
    userId: string;
    title: string;
    description?: string;
    task: 'assignment' | 'project' | 'exam';
    className?: string;
    priority?: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progess' | 'completed';
    dueDate: string; // parsed back as a string in ISO 8601 format
}

export interface AddTaskRequest {
    title: string;
    description?: string;
    task: 'assignment' | 'project' | 'exam';
    className?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'in-progess' | 'completed';
    dueDate: string;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    task?: 'assignment' | 'project' | 'exam';
    className?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'in-progess' | 'completed';
    dueDate?: string;
}
