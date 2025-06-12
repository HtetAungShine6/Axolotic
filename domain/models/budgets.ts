export interface Budget {
  _id: string;
  name: string;
  trackerId: string;
  budgetAmount: number;
  remainingAmount: number;
  period: "MONTHLY" | "WEEKLY" | "YEARLY";
  startDate: string;
  endDate: string;
  expenseIds: string[];
  __v: number;
}
