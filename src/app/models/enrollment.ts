export interface Enrollment {
    userId: string;
    courseId: string;
    status: 'enrolled' | 'completed';
    progress: number; // Percentage completed (0–100)
    enrolledAt: string; //ISOdatestring
    completedAt?: string; //ISO date string, if completed
}