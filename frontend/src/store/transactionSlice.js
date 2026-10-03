// WEEK 14 - Redux Toolkit "slice": state + reducers in one place.
// A reducer is a function that changes the state when an action is dispatched.
import { createSlice } from "@reduxjs/toolkit";

const sortNewestFirst = (list) => list.sort((a, b) => new Date(b.date) - new Date(a.date));

const transactionSlice = createSlice({
  name: "transactions",
  initialState: { list: [] },
  reducers: {
    setTransactions(state, action) {
      state.list = action.payload;
    },
    addTransaction(state, action) {
      state.list.push(action.payload);
      sortNewestFirst(state.list);
    },
    updateTransaction(state, action) {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
      sortNewestFirst(state.list);
    },
    deleteTransaction(state, action) {
      state.list = state.list.filter((t) => t.id !== action.payload); // payload = id
    },
  },
});

export const { setTransactions, addTransaction, updateTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
