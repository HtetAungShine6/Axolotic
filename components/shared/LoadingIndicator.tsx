import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#4F378A" />
    </View>
  );
};

export default LoadingIndicator;
