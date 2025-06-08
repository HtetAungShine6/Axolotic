import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TransactionList from "@/components/dashboard/TransactionList";
import ErrorDisplay from "@/components/shared/ErrorDisplay";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useTrackerData } from "@/hooks/useTrackerData";
import { useUser } from "@/hooks/useUser";
import { router } from "expo-router";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// prod push
export default function Index() {
  const { username } = useUser();
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
  } = useTrackerData();

  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <ErrorDisplay message={error.message} />;
    }

    return (
      <View className="flex-1 flex-col gap-4">
        <DashboardSummary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBalance={totalBalance}
        />
        <View>
          <Text className="text-xl font-bold mb-2">Recent Transactions</Text>
          <TransactionList expenses={recentExpenses} />
          {hasMoreExpenses && (
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/history")}
              className="mt-4 p-3 bg-gray-200 rounded-lg items-center"
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
        <DashboardHeader username={username} />
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
