import { Budget } from "@/domain/models/budgets";

export interface BudgetInterface {
  getBudgetByTrackerId(trackerId: string, token: string): Promise<Budget[]>;
}
