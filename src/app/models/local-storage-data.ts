import { Course } from "./course";
import { Enrollment } from "./enrollment";
import { User } from "./user";

export interface LocalStorageData {
    courses: Course[];
    enrollments: Enrollment[];
    user: User;
}