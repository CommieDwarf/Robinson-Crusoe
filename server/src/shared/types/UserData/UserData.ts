export interface UserData {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    emailVerified: boolean;
    preferences: UserPreferencesData
}   

export interface UserPreferencesData {
    skipUITour: boolean;
}