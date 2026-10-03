// WEEK 14 - The Redux store: one object that holds the shared state.
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
  reducer: { transactions: transactionReducer },
});
