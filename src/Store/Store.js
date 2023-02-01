import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenceReducer from "./ExpenseSlice";

const store = configureStore({
  reducer: { auth: authReducer, userExpense: expenceReducer },
});

export default store;
