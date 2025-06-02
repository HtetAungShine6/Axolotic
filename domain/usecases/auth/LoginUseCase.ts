import {AuthRepository} from "@/domain/repositories/auth/AuthRepository";
import {LoginRequestDto} from "@/models/auth/login-request-dto";
import {LoginResponse} from "@/models/auth/login-response";

export class LoginUseCase {
    constructor(private authRepository: AuthRepository) {}

    async execute(credentials: LoginRequestDto): Promise<LoginResponse> {
        return await this.authRepository.login(credentials);
    }
}