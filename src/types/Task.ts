export interface Task {
    id: string; 
    title: string; 
    description?: string; 
    task: 'assignment' | 'project' | 'exam';
    className?: string;
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'in-progess' | 'completed';
    dueDate: Date; // uses Date object
}