import {LoginUseCase} from "@/application/usecases/auth/LoginUseCase";
import {LoginRequestDto} from "@/domain/models/auth/login-request-dto";
import {LoginResponse} from "@/domain/models/auth/login-response";

export class AuthService {
    constructor(private loginUseCase: LoginUseCase) {}

    async login(credentials: LoginRequestDto): Promise<LoginResponse> {
        return this.loginUseCase.execute(credentials);
    }
}