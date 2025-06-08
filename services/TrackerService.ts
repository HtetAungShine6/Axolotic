import { Expense } from "@/models/expense/Expense";
import { Tracker } from "@/models/tracker/Tracker";
import { getRequest } from "@/services/Client/api";
import { getAuthToken } from "@/utils/auth";

export const getPrimaryTracker = async (): Promise<Tracker> => {
  const token = await getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  return getRequest<Tracker>("/trackers/primary", token);
};

export const getExpensesByTracker = async (
  trackerId: string
): Promise<Expense[]> => {
  const token = await getAuthToken();
  if (!token) throw new Error("Authentication token not found.");
  return getRequest<Expense[]>(`/expenses/tracker/${trackerId}`, token);
};
