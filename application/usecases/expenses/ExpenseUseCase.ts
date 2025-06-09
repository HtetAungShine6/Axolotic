import {ExpenseInterface} from "@/domain/interfaces/expenses/ExpenseInterface";
import {Expense} from "@/domain/models/expenses/Expense";

export class ExpenseUseCase {
    constructor(
        private expenseInterface: ExpenseInterface
    ) {}

    async execute(trackerId: string, token: string): Promise<Expense[]> {
        return await this.expenseInterface.getExpenseByTrackerId(trackerId, token);
    }
}