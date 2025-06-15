import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Expense {
  name: string;
  amount: number;
  budget: string;
  dateTime: string;
}

interface ExpenseSuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  expenses: Expense[];
  total: number;
}

const ExpenseSuccessModal: React.FC<ExpenseSuccessModalProps> = ({
  isVisible,
  onClose,
  message,
  expenses,
  total,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
          style={{ width: width - 32, maxHeight: "80%" }}
        >
          {/* Success Header */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark-circle" size={32} color="#22c55e" />
            </View>
            <Text className="text-xl font-bold text-gray-800 text-center">
              Expense Created Successfully!
            </Text>
            <Text className="text-gray-600 text-center mt-2 leading-5">
              {message}
            </Text>
          </View>

          {/* Expenses List */}
          <ScrollView className="max-h-64 mb-6">
            {expenses.map((expense, index) => (
              <View
                key={index}
                className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-semibold text-gray-800 flex-1">
                    {expense.name}
                  </Text>
                  <Text className="text-lg font-bold text-green-600">
                    ฿{formatAmount(expense.amount)}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View className="bg-purple-100 px-3 py-1 rounded-full">
                      <Text className="text-purple-700 font-medium text-sm">
                        {expense.budget}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-500 text-sm">
                    {formatDate(expense.dateTime)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Total */}
          {expenses.length > 1 && (
            <View className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-purple-800">
                  Total Amount
                </Text>
                <Text className="text-xl font-bold text-purple-600">
                  ฿{formatAmount(total)}
                </Text>
              </View>
            </View>
          )}

          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="bg-purple-600 py-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ExpenseSuccessModal;
