import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { addTransaction } from "@/src/store/slices/transactionSlice";

const TransactionScreen = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const transactions = useSelector(
    (state: any) => state.transaction.transactions,
  );

  const authState = useSelector((state: any) => state.auth);
  const transState = useSelector((state: any) => state.transaction);
  console.log("FULL STATE:", authState);
  console.log("FULL STATE:", transState);

  function handleAdd() {
    dispatch(
      addTransaction({
        amount: Number(amount),
        type: "expense",
      }),
    );
    setAmount("");
    console.log("updated state", transactions);
  }
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {transactions?.map((item: any, index: string) => (
        <Text key={index}>
          {item.type} - {item.amount}
        </Text>
      ))}
      <Text>Add Transaction</Text>

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity onPress={handleAdd}>
        <Text>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({});
