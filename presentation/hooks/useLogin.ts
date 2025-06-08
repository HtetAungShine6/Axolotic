import { AuthRepositoryImpl } from "@/data/repository-implementation/auth/AuthRepositoryImpl";
import { LoginUseCase } from "@/domain/usecases/auth/LoginUseCase";
import { LoginRequestDto } from "@/models/auth/login-request-dto";
import { LoginResponse } from "@/models/auth/login-response";
import { useCallback, useMemo, useState } from "react";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<LoginResponse | null>(null);

  const authRepository = useMemo(() => new AuthRepositoryImpl(), []);
  const loginUseCase = useMemo(
    () => new LoginUseCase(authRepository),
    [authRepository]
  );

  const login = useCallback(
    async (credentials: LoginRequestDto): Promise<LoginResponse> => {
      try {
        setLoading(true);
        setError(null);

        const response = await loginUseCase.execute(credentials);
        setData(response);

        return response;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Login failed");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [loginUseCase]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    login,
    loading,
    error,
    data,
    reset,
  };
};

export default useLogin;
