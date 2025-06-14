import { BudgetUseCase } from "@/application/usecases/budgets/BudgetUseCase";
import { ExpenseUseCase } from "@/application/usecases/expenses/ExpenseUseCase";
import { TrackerUseCase } from "@/application/usecases/trackers/TrackerUseCase";
import { BudgetInterface } from "@/domain/interfaces/budgets/BudgetInterface";
import { ExpenseInterface } from "@/domain/interfaces/expenses/ExpenseInterface";
import { TrackerInterface } from "@/domain/interfaces/trackers/TrackerInterface";
import { User } from "@/domain/models/auth/login-response";
import { BudgetImpl } from "@/infrastructure/data/budgets/BudgetImpl";
import { ExpenseImpl } from "@/infrastructure/data/expenses/ExpenseImpl";
import { TrackerImpl } from "@/infrastructure/data/trackers/TrackerImpl";
import BudgetChart from "@/presentation/components/dashboard/BudgetChart";
import DashboardHeader from "@/presentation/components/dashboard/DashboardHeader";
import DashboardSummary from "@/presentation/components/dashboard/DashboardSummary";
import SampleChart from "@/presentation/components/dashboard/SampleChart";
import TransactionList from "@/presentation/components/dashboard/TransactionList";
import ErrorDisplay from "@/presentation/components/shared/ErrorDisplay";
import LoadingIndicator from "@/presentation/components/shared/LoadingIndicator";
import { useTrackerData } from "@/presentation/viewmodels/hooks/useTrackerData";
import TokenManager from "@/utils/tokenManager";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const trackerInterface: TrackerInterface = new TrackerImpl();
const trackerUseCase = new TrackerUseCase(trackerInterface);
const expenseInterface: ExpenseInterface = new ExpenseImpl();
const expenseUseCase = new ExpenseUseCase(expenseInterface);
const budgetInterface: BudgetInterface = new BudgetImpl();
const budgetUseCase = new BudgetUseCase(budgetInterface);

export default function Index() {
  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    loading,
    error,
    recentExpenses,
    hasMoreExpenses,
    refreshing,
    refetch,
    expenses,
    budgets,
  } = useTrackerData(trackerUseCase, expenseUseCase, budgetUseCase);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await TokenManager.getUser();
      setUser(fetchedUser);
    };
    loadUser();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorDisplay message={error.message} />;
    }

    return (
      <View className="flex-1 flex-col gap-8 pb-24">
        <DashboardSummary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBalance={totalBalance}
        />
        <BudgetChart budgets={budgets} />
        <SampleChart expenses={expenses} />
        <View className="flex-col gap-4">
          <Text className="text-xl font-bold">Budgets</Text>
          {budgets.map((budget) => (
            <View key={budget._id} className="flex-row justify-between">
              <Text>{budget.name}</Text>
              <Text>
                {(budget.budgetAmount - budget.remainingAmount).toFixed(2)}
                &nbsp;/&nbsp;
                {budget.budgetAmount.toFixed(2)}&nbsp;THB
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-col gap-4">
          <Text className="text-xl font-bold">Recent Transactions</Text>
          <TransactionList expenses={expenses} />
          {hasMoreExpenses && (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/history")}
              className="p-3 bg-gray-200 rounded-lg items-center"
            >
              <Text className="font-semibold text-gray-700">See More</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      >
        <DashboardHeader username={user?.username || "User"} />
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
