import { BudgetUseCase } from "@/application/usecases/budgets/BudgetUseCase";
import { ExpenseUseCase } from "@/application/usecases/expenses/ExpenseUseCase";
import { TrackerUseCase } from "@/application/usecases/trackers/TrackerUseCase";
import { useAuth } from "@/contexts/authContext";
import { Budget } from "@/domain/models/budgets";
import { Expense } from "@/domain/models/expenses/Expense";
import { Tracker } from "@/domain/models/trackers/Tracker";
import TokenManager from "@/utils/tokenManager";
import { useCallback, useEffect, useState } from "react";

export const useTrackerData = (
  trackerUseCase: TrackerUseCase,
  expenseUseCase: ExpenseUseCase,
  budgetUseCase: BudgetUseCase
) => {
  const { isAuthenticated } = useAuth();
  const [tracker, setTracker] = useState<Tracker>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
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
        const trackerBudgets = await budgetUseCase.execute(
          primaryTracker._id,
          token
        );
        setExpenses(trackerExpenses);
        setBudgets(trackerBudgets);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
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
    budgets,
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
