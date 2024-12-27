export interface Class {
    classId: string;
    userId: string;
    name: string;
    professor?: string;
    start?: string;
    end?: string;
    location?: string;
    days?: string[];
    semester?: string;
}