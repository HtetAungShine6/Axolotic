import { useAuth } from "@/contexts/AuthContext";

export const useUser = () => {
  const { user, isAuthenticated } = useAuth();

  return {
    user,
    isAuthenticated,
    username: user?.username,
    email: user?.email,
    subscription: user?.subscription,
    userId: user?.id,
    isPremium: user?.subscription === "PREMIUM",
    isBasic: user?.subscription === "BASIC",
  };
};
