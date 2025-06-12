import { BudgetInterface } from "@/domain/interfaces/budgets/BudgetInterface";
import { Budget } from "@/domain/models/budgets";

export class BudgetUseCase {
  constructor(private budgetInterface: BudgetInterface) {}

  async execute(trackerId: string, token: string): Promise<Budget[]> {
    return await this.budgetInterface.getBudgetByTrackerId(trackerId, token);
  }
}
