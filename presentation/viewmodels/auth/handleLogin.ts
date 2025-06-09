import { Alert } from "react-native";
import { router } from "expo-router";
import type { LoginRequestDto } from "@/domain/models/auth/login-request-dto";
import {User} from "@/domain/models/auth/login-response";
import TokenManager from "@/utils/tokenManager";

export async function handleLogin(
    email: string,
    password: string,
    performLogin: (credentials: LoginRequestDto) => Promise<{ access_token: string, user: User }>,
    authLogin: (token: string, user: User) => Promise<void>
) {
    if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
    }

    // try {
    //     const credentials: LoginRequestDto = { email, password };
    //     const response = await performLogin(credentials);
    //     await authLogin(response.access_token, response.user);
    //     router.replace("/(tabs)");
    // } catch (err) {
    //     console.log("Error", err);
    //     Alert.alert(
    //         "Login Failed",
    //         err instanceof Error ? err.message : "Unknown error occurred",
    //     );
    // }

    try {
        const credentials: LoginRequestDto = { email, password };
        const response = await performLogin(credentials);

        // Optional: Check token validity here before proceeding
        const isValid = await TokenManager.isTokenValid(response.access_token);
        if (!isValid) {
            Alert.alert("Login Failed", "Invalid or expired token received.");
            return;
        }

        await authLogin(response.access_token, response.user);
        router.replace("/(tabs)");
    } catch (err) {
        console.log("Login error:", err);
        Alert.alert(
            "Login Failed",
            err instanceof Error ? err.message : "Unknown error occurred",
        );
    }
}