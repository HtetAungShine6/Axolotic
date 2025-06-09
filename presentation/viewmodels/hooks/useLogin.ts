import { useState } from 'react';
import { LoginResponse } from "@/domain/models/auth/login-response";
import { LoginRequestDto } from "@/domain/models/auth/login-request-dto";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import {useAuth} from "@/contexts/authContext";

const useLogin = (loginUseCase: LoginUseCase) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<LoginResponse | null>(null);
    const { login: authLogin } = useAuth();

    const login = async (credentials: LoginRequestDto): Promise<LoginResponse> => {
        try {
            setLoading(true);
            setError(null);

            const response = await loginUseCase.execute(credentials);
            await authLogin(response.access_token, response.user);
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

    const reset = async () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    return {
        login,
        loading,
        error,
        data,
        reset,
    };
};

export default useLogin;