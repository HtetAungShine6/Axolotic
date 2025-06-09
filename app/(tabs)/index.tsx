
import { router } from "expo-router";
import React, {useEffect, useState} from "react";
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useTrackerData} from "@/presentation/viewmodels/hooks/useTrackerData";
import LoadingIndicator from "@/presentation/components/shared/LoadingIndicator";
import ErrorDisplay from "@/presentation/components/shared/ErrorDisplay";
import DashboardSummary from "@/presentation/components/dashboard/DashboardSummary";
import TransactionList from "@/presentation/components/dashboard/TransactionList";
import DashboardHeader from "@/presentation/components/dashboard/DashboardHeader";
import TokenManager from "@/utils/tokenManager";
import {User} from "@/domain/models/auth/login-response";
import {TrackerInterface} from "@/domain/interfaces/trackers/TrackerInterface";
import {TrackerImpl} from "@/infrastructure/data/trackers/TrackerImpl";
import {TrackerUseCase} from "@/application/usecases/trackers/TrackerUseCase";
import {ExpenseInterface} from "@/domain/interfaces/expenses/ExpenseInterface";
import {ExpenseImpl} from "@/infrastructure/data/expenses/ExpenseImpl";
import {ExpenseUseCase} from "@/application/usecases/expenses/ExpenseUseCase";

const trackerInterface: TrackerInterface = new TrackerImpl();
const trackerUseCase =  new TrackerUseCase(trackerInterface);
const expenseInterface: ExpenseInterface = new ExpenseImpl();
const expenseUseCase = new ExpenseUseCase(expenseInterface);

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
    } = useTrackerData(trackerUseCase, expenseUseCase);

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
                <DashboardHeader username={user?.username || "User"} />
                {renderContent()}
            </ScrollView>
        </SafeAreaView>
    );
}