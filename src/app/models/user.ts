export interface User {
    userId: string;
    name: string;
    email: string;
    preferences: {
        preferredCategories: string[]; // e.g., ["Programming","Design"]
        notifications: boolean; //Receiveemailnotifications
    };
}