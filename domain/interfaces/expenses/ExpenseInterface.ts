import {Expense} from "@/domain/models/expenses/Expense";

export interface ExpenseInterface {
    getExpenseByTrackerId(trackerId: string, token: string): Promise<Expense[]>
}