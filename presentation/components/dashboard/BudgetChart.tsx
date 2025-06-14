import { Budget } from "@/domain/models/budgets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface BudgetChartProps {
  budgets: Budget[];
}

const colors = [
  "#00D4FF", // Electric Cyan
  "#FF1744", // Bright Red
  "#00E676", // Neon Green
  "#9C27B0", // Vivid Purple
  "#FFD600", // Bright Yellow
  "#2196F3", // Electric Blue
  "#FF4081", // Hot Pink
  "#4CAF50", // Vivid Green
  "#FF6B35", // Vibrant Orange-Red
  "#00BCD4", // Bright Teal
  "#E91E63", // Magenta
];

const BudgetChart: React.FC<BudgetChartProps> = ({ budgets }) => {
  if (!budgets || budgets.length === 0) {
    return (
      <View className="bg-white p-4 rounded-xl shadow-sm items-center justify-center h-64">
        <Text className="text-gray-500">No budget data to display.</Text>
      </View>
    );
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.budgetAmount, 0);
  const totalSpent = budgets.reduce(
    (sum, b) => sum + b.budgetAmount - b.remainingAmount,
    0
  );

  const pieData = budgets
    .sort((a, b) => b.budgetAmount - a.budgetAmount)
    .map((budget, index) => {
      const percentage =
        ((budget.budgetAmount - budget.remainingAmount) / totalBudget) * 100;
      return {
        value: percentage,
        color: colors[index % colors.length],
        text: `${Math.round(percentage)}%`,
        label: budget.name,
      };
    });

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm">
      <View className="flex justify-between mb-4 gap-1">
        <Text className="text-xl font-bold">Spent by Budgets</Text>
        <Text className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString()}
        </Text>
      </View>
      <View className="mb-6 items-center ">
        <PieChart
          data={pieData}
          donut
          // showText
          textColor="white"
          radius={90}
          innerRadius={60}
          textSize={14}
          fontWeight="bold"
          focusOnPress
          centerLabelComponent={() => {
            return (
              <View className="justify-center items-center">
                <MaterialCommunityIcons
                  name="credit-card-multiple-outline"
                  size={16}
                  color="black"
                />
                <Text className="text-lg font-bold mt-1">
                  {totalSpent >= 1_000_000
                    ? (totalSpent / 1_000_000).toFixed(1) + "M"
                    : totalSpent >= 1_000
                    ? (totalSpent / 1_000).toFixed(1) + "K"
                    : totalSpent.toFixed(2)}{" "}
                  THB
                </Text>
                <Text className="text-sm text-gray-500">in Expenses</Text>
              </View>
            );
          }}
        />
      </View>

      <View className="w-full flex-row flex-wrap">
        {pieData.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center m-2 p-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            />
            <Text className="text-gray-700 font-semibold text-sm">
              {item.label} - {item.text}
            </Text>
          </View>
        ))}
        <View className="h-1 w-full bg-gray-200 my-4" />
        <View className="flex-col items-center gap-2 p-2">
          <View className="w-full flex-row justify-between">
            <Text className="text-gray-700 font-semibold">Set Budget:</Text>
            <Text>
              {" "}
              {totalBudget.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} THB
            </Text>
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-gray-700 font-semibold">Total Spent:</Text>
            <Text>
              {" "}
              {totalSpent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} THB
            </Text>
          </View>
          <View className="w-full flex-row justify-between">
            <Text className="text-gray-700 font-semibold">Remaining:</Text>
            <Text>
              {(totalBudget - totalSpent)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              THB
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BudgetChart;
