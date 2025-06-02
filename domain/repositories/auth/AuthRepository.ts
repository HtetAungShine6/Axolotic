import {LoginRequestDto} from "@/models/auth/login-request-dto";
import {LoginResponse} from "@/models/auth/login-response";

export interface AuthRepository {
    login(credentials: LoginRequestDto): Promise<LoginResponse>
}