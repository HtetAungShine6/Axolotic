import { useState } from "react";
import React from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginUseCase } from "@/application/usecases/auth/LoginUseCase";
import { LoginRequestDto } from "@/domain/models/auth/login-request-dto";
import { useAuth } from "@/contexts/authContext";
import useLogin from "@/presentation/viewmodels/hooks/useLogin";
import { AuthInterface } from "@/domain/interfaces/auth/AuthInterface";
import { AuthRepositoryImpl } from "@/infrastructure/data/auth/AuthRepositoryImpl";
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert} from "react-native";
import {handleLogin} from "@/presentation/viewmodels/auth/handleLogin";

const authRepo: AuthInterface = new AuthRepositoryImpl();
const loginUseCase = new LoginUseCase(authRepo);

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login: authLogin } = useAuth();
    const {
        login: performLogin,
        loading,
        error,
    } = useLogin(loginUseCase);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="flex-1 justify-center px-8">
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </Text>
                    <Text className="text-gray-600 text-center">
                        Sign in to your Axolotic account
                    </Text>
                </View>

                <View className="mb-6">
                    <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textAlignVertical="top"
                    />
                </View>

                <View className="mb-6">
                    <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        textAlignVertical="top"
                    />
                </View>

                {error && (
                    <View className="mb-4">
                        <Text className="text-red-500 text-center">{error.message}</Text>
                    </View>
                )}

                <TouchableOpacity
                    className="bg-purple-600 rounded-lg py-4 mb-4"
                    onPress={() =>
                        handleLogin(email, password, performLogin, authLogin)
                    }
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-semibold text-lg">
                            Sign In
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity className="py-2">
                    <Text className="text-purple-600 text-center">Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;