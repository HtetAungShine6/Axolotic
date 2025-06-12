import { getRequest } from "@/application/services/Client/api";
import { BudgetInterface } from "@/domain/interfaces/budgets/BudgetInterface";
import { Budget } from "@/domain/models/budgets";

export class BudgetImpl implements BudgetInterface {
  async getBudgetByTrackerId(
    trackerId: string,
    token: string
  ): Promise<Budget[]> {
    const endpoint = `/budgets/tracker/${trackerId}`;
    return await getRequest<Budget[]>(endpoint, token);
  }
}
