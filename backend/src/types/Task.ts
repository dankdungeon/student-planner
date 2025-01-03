export interface Task {
    taskId: string; 
    userId: string;
    title: string; 
    description?: string; 
    task: 'assignment' | 'project' | 'exam';
    classId: string;
    priority?: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: Date; // uses Date object
}

export interface TaskResponse {
    taskId: string;
    userId: string;
    title: string;
    description?: string;
    task: 'assignment' | 'project' | 'exam';
    classId: string;
    priority?: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    dueDate: string; // parsed back as a string in ISO 8601 format
}

export interface AddTaskRequest {
    title: string;
    description?: string;
    task: 'assignment' | 'project' | 'exam';
    classId: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'in-progress' | 'completed';
    dueDate: string;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    task?: 'assignment' | 'project' | 'exam';
    classId?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'in-progress' | 'completed';
    dueDate?: string;
}
