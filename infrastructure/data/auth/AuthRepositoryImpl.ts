import {AuthInterface} from "@/domain/interfaces/auth/AuthInterface";
import {LoginRequestDto} from "@/domain/models/auth/login-request-dto";
import {LoginResponse} from "@/domain/models/auth/login-response";
import {postRequest} from "@/application/services/Client/api";

export class AuthRepositoryImpl implements AuthInterface {
    async login(credentials: LoginRequestDto):  Promise<LoginResponse> {
        return await postRequest<LoginResponse, LoginRequestDto>(
            '/auth/login',
            credentials
        );
    }
}