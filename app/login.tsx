import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      await login({ email, password });
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

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
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
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
}
