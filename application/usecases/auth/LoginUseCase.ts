import {AuthInterface} from "@/domain/interfaces/auth/AuthInterface";
import {LoginRequestDto} from "@/domain/models/auth/login-request-dto";
import {LoginResponse} from "@/domain/models/auth/login-response";

export class LoginUseCase {
    constructor(private authRepository: AuthInterface) {}

    async execute(credentials: LoginRequestDto): Promise<LoginResponse> {
        return await this.authRepository.login(credentials);
    }
}