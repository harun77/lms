export interface Course {
    id: string;
    title: string;
    description: string;
    category: string; // e.g.,"Programming","Design"
    isFree: boolean;
    prerequisites: string[]; // List of course IDs required
    duration: number; //Duration in hours
}