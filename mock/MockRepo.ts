import {AuthInterface} from "@/domain/interfaces/auth/AuthInterface";
import {LoginRequestDto} from "@/domain/models/auth/login-request-dto";
import {LoginResponse} from "@/domain/models/auth/login-response";

export class MockAuthRepository implements AuthInterface {
    async login(credentials: LoginRequestDto): Promise<LoginResponse> {
        const { email, password } = credentials;

        // Simulate a fake validation
        if (email === "lynn@example.com" && password === "password123") {
            return {
                access_token: "mock-access-token-12345",
                user: [
                    {
                        id: "mock-user-id-001",
                        username: "mockuser",
                        email: credentials.email,
                        subscription: "free"
                    }
                ]
            };
        } else {
            throw new Error("Invalid credentials (mock)");
        }
    }
}