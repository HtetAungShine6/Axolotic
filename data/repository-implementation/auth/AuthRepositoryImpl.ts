import {AuthRepository} from "@/domain/repositories/auth/AuthRepository";
import {LoginRequestDto} from "@/models/auth/login-request-dto";
import {LoginResponse} from "@/models/auth/login-response";
import {postRequest} from "@/services/Client/api";

export class AuthRepositoryImpl implements AuthRepository {
    async login(credentials: LoginRequestDto):  Promise<LoginResponse> {
        const response = await postRequest<LoginResponse, LoginRequestDto>(
            '/auth/login',
            credentials
        );

        console.log(response);
        return response;
    }
}