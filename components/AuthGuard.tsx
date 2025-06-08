import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (!isAuthenticated && inAuthGroup) {
      // Redirect to login if not authenticated and trying to access protected routes
      router.replace("/login");
    } else if (isAuthenticated && !inAuthGroup) {
      // Redirect to tabs if authenticated and not in protected routes
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments]);

  return <>{children}</>;
}
