import {ExpenseInterface} from "@/domain/interfaces/expenses/ExpenseInterface";
import {Expense} from "@/domain/models/expenses/Expense";
import {getRequest} from "@/application/services/Client/api";

export class ExpenseImpl implements ExpenseInterface {
    async getExpenseByTrackerId(trackerId: string, token: string): Promise<Expense[]> {
        const endpoint = `/expenses/tracker/${trackerId}`;
        return await getRequest<Expense[]>(endpoint, token);
    }
}