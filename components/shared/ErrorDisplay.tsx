import React from "react";
import { Text, View } from "react-native";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <View className="p-4 bg-red-100 rounded-lg">
      <Text className="text-red-600 text-center font-semibold">
        Could not load data
      </Text>
      <Text className="text-red-500 text-center mt-1">{message}</Text>
    </View>
  );
};

export default ErrorDisplay;
