export interface Task {
    id: string; 
    title: string; 
    description?: string; 
    type: 'task' | 'project' | 'exam';
    class?: string;
    duedate: Date; // uses Date object
    priority?: 'low' | 'medium' | 'high';
    status?: 'pending' | 'in-progess' | 'completed';
}