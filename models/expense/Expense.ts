export interface Expense {
  _id: string;
  trackerId: string;
  budgetId: string;
  name: string;
  dateTime: string;
  amount: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
