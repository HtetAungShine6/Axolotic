import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

interface ErrorModalProps {
  isVisible: boolean;
  onClose: () => void;
  onRetry?: () => void;
  title?: string;
  message: string;
  hint?: string;
  code?: number;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible,
  onClose,
  onRetry,
  title = "Something went wrong",
  message,
  hint,
  code,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View
          className="bg-white rounded-2xl p-6 shadow-lg"
          style={{ width: width - 32 }}
        >
          {/* Error Header */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="alert-circle" size={32} color="#ef4444" />
            </View>
            <Text className="text-xl font-bold text-gray-800 text-center">
              {title}
            </Text>
            {code && (
              <Text className="text-gray-500 text-sm mt-1">
                Error Code: {code}
              </Text>
            )}
          </View>

          {/* Error Message */}
          <View className="bg-red-50 rounded-xl p-4 mb-4 border border-red-200">
            <Text className="text-gray-800 text-center leading-5">
              {message}
            </Text>
          </View>

          {/* Hint */}
          {hint && (
            <View className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <View className="flex-row items-start">
                <Ionicons
                  name="information-circle"
                  size={20}
                  color="#3b82f6"
                  className="mr-2 mt-0.5"
                />
                <Text className="text-blue-800 text-sm leading-5 flex-1">
                  <Text className="font-semibold">Tip: </Text>
                  {hint}
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-200 py-4 rounded-xl"
            >
              <Text className="text-gray-800 text-center font-semibold text-lg">
                Cancel
              </Text>
            </TouchableOpacity>

            {onRetry && (
              <TouchableOpacity
                onPress={onRetry}
                className="flex-1 bg-purple-600 py-4 rounded-xl"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Try Again
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
