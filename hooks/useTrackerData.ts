import { useAuth } from "@/contexts/AuthContext";
import { Expense } from "@/models/expense/Expense";
import { Tracker } from "@/models/tracker/Tracker";
import {
  getExpensesByTracker,
  getPrimaryTracker,
} from "@/services/TrackerService";
import { useCallback, useEffect, useState } from "react";

export const useTrackerData = () => {
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
      const primaryTracker = await getPrimaryTracker();
      setTracker(primaryTracker);
      if (primaryTracker?._id) {
        const trackerExpenses = await getExpensesByTracker(primaryTracker._id);
        setExpenses(trackerExpenses);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    }
  }, [isAuthenticated]);

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
