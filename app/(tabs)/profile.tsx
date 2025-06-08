import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const { logout } = useAuth();
  const { user, username, email, subscription, isPremium } = useUser();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View className="flex-1 justify-center items-center px-8 bg-white">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-center mb-4">Profile</Text>

        {user && (
          <View className="mb-6">
            <Text className="text-gray-600 text-center mb-2">
              Welcome back!
            </Text>
            <Text className="text-lg font-semibold text-center">
              {username}
            </Text>
            <Text className="text-gray-500 text-center">{email}</Text>
            <View className="flex-row justify-center items-center mt-2">
              <Text className="text-purple-600 text-center capitalize mr-2">
                {subscription}
              </Text>
              {isPremium && (
                <Text className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  ⭐ Premium
                </Text>
              )}
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        className="bg-red-500 rounded-lg py-4 px-8 w-full"
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
