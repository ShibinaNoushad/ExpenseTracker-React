import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
});
export default ExpenseSlice.reducer;
export const expenseActions = ExpenseSlice.actions;
