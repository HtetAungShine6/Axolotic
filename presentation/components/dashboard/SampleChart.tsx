import { ExpenseUseCase } from "@/application/usecases/expenses/ExpenseUseCase";
import { TrackerUseCase } from "@/application/usecases/trackers/TrackerUseCase";
import { ExpenseInterface } from "@/domain/interfaces/expenses/ExpenseInterface";
import { TrackerInterface } from "@/domain/interfaces/trackers/TrackerInterface";
import { Expense } from "@/domain/models/expenses/Expense";
import { ExpenseImpl } from "@/infrastructure/data/expenses/ExpenseImpl";
import { TrackerImpl } from "@/infrastructure/data/trackers/TrackerImpl";
import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const trackerInterface: TrackerInterface = new TrackerImpl();
const trackerUseCase = new TrackerUseCase(trackerInterface);
const expenseInterface: ExpenseInterface = new ExpenseImpl();
const expenseUseCase = new ExpenseUseCase(expenseInterface);

const SampleChart = ({ expenses }: { expenses: Expense[] }) => {
  const { width: screenWidth } = useWindowDimensions();

  const formatNumberWithAbbreviation = (num: number): string => {
    if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}m`;
    }
    if (num >= 1_000) {
      return `${(num / 1_000).toFixed(2)}k`;
    }
    if (num % 1 === 0) {
      return num.toString();
    }
    return num.toFixed(2);
  };

  // Calculate available width (accounting for padding and margins)
  const availableWidth = screenWidth - 32; // 32 = p-4 (16px padding on each side)

  //   const barData = [
  //     { value: 50, label: "Mon" },
  //     { value: 80, label: "Tue" },
  //     { value: 90, label: "Wed" },
  //     { value: 70, label: "Thu" },
  //     { value: 85, label: "Fri" },
  //     { value: 45, label: "Sat" },
  //     { value: 65, label: "Sun" },
  //   ];

  // Aggregate expenses for the last 7 days
  const dailyData = new Map<string, { value: number; label: string }>();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayKey = date.toISOString().split("T")[0];
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    days.push({ key: dayKey, label });
    dailyData.set(dayKey, { value: 0, label });
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  expenses
    ?.filter((expense) => new Date(expense.dateTime) >= startDate)
    ?.forEach((expense) => {
      const expenseDateKey = new Date(expense.dateTime)
        .toISOString()
        .split("T")[0];
      if (dailyData.has(expenseDateKey)) {
        const dayData = dailyData.get(expenseDateKey)!;
        dayData.value += expense.amount;
      }
    });

  const weeklyBarData = days.map((day) => {
    const item = dailyData.get(day.key)!;
    return {
      ...item,
      topLabelComponent: () => (
        <Text
          style={{
            color: "#666",
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          {formatNumberWithAbbreviation(item.value)}
        </Text>
      ),
    };
  });

  const maxExpense = Math.max(...weeklyBarData.map((item) => item.value));
  const maxValue = Math.max(100, Math.ceil((maxExpense + 1) / 50) * 50);

  return (
    <View className="bg-white p-4 rounded-xl shadow-sm">
      <Text className="text-xl font-bold mb-4">Weekly Spending</Text>
      <View className="items-center w-full overflow-hidden">
        <BarChart
          data={weeklyBarData}
          width={availableWidth}
          disableScroll={true}
          barWidth={Math.floor((availableWidth - 120) / 7)} // Dynamic bar width
          spacing={12}
          height={220}
          barBorderRadius={4}
          frontColor="#9C27B0"
          yAxisExtraHeight={30}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor={"#ddd"}
          hideYAxisText={true}
          yAxisTextStyle={{ color: "#666" }}
          xAxisLabelTextStyle={{ color: "#666", marginTop: 4 }}
          maxValue={maxValue}
          noOfSections={5}
          initialSpacing={0}
          endSpacing={0}
        />
      </View>
      {/* <View className="mt-6 border-t border-gray-200 pt-4">
        <Text className="text-lg font-bold mb-2">Daily Breakdown</Text>
        {weeklyBarData.map((item, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center py-2"
          >
            <Text className="text-gray-600">{item.label}</Text>
            <Text className="font-semibold">${item.value.toFixed(2)}</Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

export default SampleChart;
