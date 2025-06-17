import { Expense } from "@/domain/models/expenses/Expense";
import React from "react";
import { View } from "react-native";
import TransactionListItem from "./TransactionListItem";

interface TransactionListProps {
  expenses: Expense[];
}

const TransactionList: React.FC<TransactionListProps> = ({ expenses }) => {
  return (
    <View>
      {expenses.map((expense) => (
        <TransactionListItem key={expense._id} item={expense} />
      ))}
    </View>
  );
};

export default TransactionList;
