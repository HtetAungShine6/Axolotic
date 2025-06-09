import {LoginRequestDto} from "@/domain/models/auth/login-request-dto";
import {LoginResponse} from "@/domain/models/auth/login-response";

export interface AuthInterface {
    login(credentials: LoginRequestDto): Promise<LoginResponse>
}