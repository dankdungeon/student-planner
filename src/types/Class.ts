export interface Class {
    classId: string;
    userId: string;
    name: string;
    professor?: string;
    start?: Date;
    end?: Date;
    location?: string;
    days?: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
    semester?: string;
}

export interface ClassResponse extends Omit<Class, 'start' | 'end'> {
    start?: string | null;
    end?: string | null;
}

export interface AddClassRequest extends Omit<Class, 'classId' | 'userId' | 'start' | 'end'> {
    start?: string;
    end?: string;
}
export interface UpdateClassRequest extends Omit<AddClassRequest, 'name'> {
    name?: string;
}