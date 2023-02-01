import { createSlice } from "@reduxjs/toolkit";
const initialExpenseState = { expenses: [] };

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    getData(state, action) {
      state.expenses = action.payload;
    },
  },
});
export default ExpenseSlice.reducer;
export const expenseActions = ExpenseSlice.actions;
