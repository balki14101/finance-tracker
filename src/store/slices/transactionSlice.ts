import { createSlice } from "@reduxjs/toolkit";

type transaction = {
  amount: number;
  type: "income" | "expense";
  date: string;
  selectedCategory: string;
  note: string;
};
type transactionState = {
  transactions: transaction[];
};
const initialState: transactionState = {
  transactions: [],
};
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      console.log("transaction payload", action.payload);
      state.transactions.push(action.payload);
      console.log("transaction state", state.transactions);
    },
  },
});

export const { addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
