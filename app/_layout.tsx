// import {Stack} from "expo-router";
// import './globals.css';
// import {View} from "react-native";
// import AuthScreen from "@/presentation/screens/AuthScreen";
// import AuthDummy from "@/presentation/screens/auth/AuthDummy";
//
// export default function RootLayout() {
//     return (
//         <AuthDummy/>
//         // <Stack>
//         //     <Stack.Screen
//         //         name="(tabs)"
//         //         options={{ headerShown: false }}
//         //     />
//         // </Stack>
//     );
// }
import "@/utils/polyfills";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import "./globals.css";

import { AuthProvider, useAuth } from "@/contexts/authContext";
import LoginScreen from "@/presentation/screens/auth/LoginScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function LayoutContent() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    // Optional: loading state while checking token
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="manualInput"
        options={{
          presentation: "modal",
          headerShown: false,
          title: "Add Manually",
        }}
      />
      <Stack.Screen
        name="documents"
        options={{
          presentation: "modal",
          headerShown: false,
          title: "Add by Document",
        }}
      /> */}
    </Stack>
  ) : (
    <LoginScreen />
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <LayoutContent />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
