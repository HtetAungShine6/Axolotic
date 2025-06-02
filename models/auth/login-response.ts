export interface LoginResponse {
    access_token: string;
    user: [User]
}

interface User {
    id: string;
    username: string;
    email: string;
    subscription: string;
}