import { formatCurrency } from "@/utils/currency";
import React from "react";
import { Text, View } from "react-native";

interface DashboardSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  totalIncome,
  totalExpenses,
  totalBalance,
}) => {
  return (
    <View className="p-4 bg-white rounded-lg shadow-sm">
      <View className="mb-4">
        <Text className="text-gray-500 text-sm">Total Balance</Text>
        <Text className="text-3xl font-bold text-gray-800">
          {formatCurrency(totalBalance)}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <View>
          <Text className="text-green-600 font-semibold">Income</Text>
          <Text className="text-green-600">{formatCurrency(totalIncome)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-red-600 font-semibold">Expenses</Text>
          <Text className="text-red-600">
            {formatCurrency(Math.abs(totalExpenses))}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardSummary;
