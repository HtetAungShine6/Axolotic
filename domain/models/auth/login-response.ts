export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface User {
    id: string;
    username: string;
    email: string;
    subscription: string;
}