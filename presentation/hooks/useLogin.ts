import { useState } from 'react';
import {LoginResponse} from "@/models/auth/login-response";
import {AuthRepositoryImpl} from "@/data/repository-implementation/auth/AuthRepositoryImpl";
import {LoginRequestDto} from "@/models/auth/login-request-dto";
import {LoginUseCase} from "@/domain/usecases/auth/LoginUseCase";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<LoginResponse | null>(null);

    // Dependency injection - in a real app, this would come from a DI container
    const authRepository = new AuthRepositoryImpl();
    const loginUseCase = new LoginUseCase(authRepository);

    const login = async (credentials: LoginRequestDto): Promise<LoginResponse> => {
        try {
            setLoading(true);
            setError(null);

            const response = await loginUseCase.execute(credentials);
            setData(response);

            return response;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Login failed');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    return {
        login,
        loading,
        error,
        data,
        reset
    };
};

export default useLogin;