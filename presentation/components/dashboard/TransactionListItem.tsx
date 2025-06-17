import { Expense } from "@/domain/models/expenses/Expense";
import { formatCurrency } from "@/utils/currency";
import React from "react";
import { Text, View } from "react-native";

interface TransactionListItemProps {
  item: Expense;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ item }) => {
  return (
    <View className="flex-col justify-between p-4 mb-2 bg-white rounded-lg">
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="font-semibold text-base">{item.name}</Text>
        <Text className="text-red-500 font-bold">
          {formatCurrency(item.amount)}
        </Text>
      </View>
      <Text className="text-sm text-gray-500 w-3/5" numberOfLines={2}>
        {item.notes}
      </Text>
    </View>
  );
};

export default TransactionListItem;
