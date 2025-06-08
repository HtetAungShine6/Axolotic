import React from "react";
import { Text, View } from "react-native";

interface DashboardHeaderProps {
  username: string | null | undefined;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  return (
    <View className="flex flex-col gap-2 mb-4">
      <Text className="text-2xl font-bold">Hello, {username || "User"}!</Text>
      <Text className="text-lg">Here is your financial summary.</Text>
    </View>
  );
};

export default DashboardHeader;
