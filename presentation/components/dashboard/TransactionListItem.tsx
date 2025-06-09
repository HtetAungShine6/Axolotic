
import { formatCurrency } from "@/utils/currency";
import React from "react";
import { Text, View } from "react-native";
import {Expense} from "@/domain/models/expenses/Expense";

interface TransactionListItemProps {
    item: Expense;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ item }) => {
    return (
        <View className="flex-row justify-between items-center p-4 mb-2 bg-white rounded-lg">
            <Text className="font-semibold text-base">{item.name}</Text>
            <Text className="text-red-500 font-bold">
                {formatCurrency(item.amount)}
            </Text>
        </View>
    );
};

export default TransactionListItem;