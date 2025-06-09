import {TrackerUseCase} from "@/application/usecases/trackers/TrackerUseCase";
import {TrackerImpl} from "@/infrastructure/data/trackers/TrackerImpl";
import {ExpenseImpl} from "@/infrastructure/data/expenses/ExpenseImpl";
import {useAuth} from "@/contexts/authContext";
import {useCallback, useEffect, useState} from "react";
import {Tracker} from "@/domain/models/trackers/Tracker";
import {Expense} from "@/domain/models/expenses/Expense";
import TokenManager from "@/utils/tokenManager";
import {TrackerInterface} from "@/domain/interfaces/trackers/TrackerInterface";
import {ExpenseInterface} from "@/domain/interfaces/expenses/ExpenseInterface";
import {ExpenseUseCase} from "@/application/usecases/expenses/ExpenseUseCase";

export const useTrackerData = (trackerUseCase: TrackerUseCase, expenseUseCase: ExpenseUseCase) => {
    const { isAuthenticated } = useAuth();
    const [tracker, setTracker] = useState<Tracker | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTrackerAndExpenses = useCallback(async () => {
        if (!isAuthenticated) return;

        try {
            setError(null);

            const token = await TokenManager.getToken();
            if (!token) throw new Error("No token found");

            const primaryTracker = await trackerUseCase.execute(token);
            setTracker(primaryTracker);

            if (primaryTracker?._id) {
                const trackerExpenses = await expenseUseCase.execute(
                    primaryTracker._id,
                    token
                );
                setExpenses(trackerExpenses);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        }
    }, [isAuthenticated, trackerUseCase, expenseUseCase]);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            fetchTrackerAndExpenses().finally(() => setLoading(false));
        }
    }, [isAuthenticated, fetchTrackerAndExpenses]);

    const refetch = useCallback(async () => {
        setRefreshing(true);
        await fetchTrackerAndExpenses();
        setRefreshing(false);
    }, [fetchTrackerAndExpenses]);

    const totalIncome = 1000000;
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    const recentExpenses = expenses.slice(0, 5);
    const hasMoreExpenses = expenses.length > 5;

    return {
        tracker,
        expenses,
        recentExpenses,
        hasMoreExpenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        loading,
        refreshing,
        refetch,
        error,
    };
};