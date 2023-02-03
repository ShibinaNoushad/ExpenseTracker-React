import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenceReducer from "./ExpenseSlice";
import themeReducer from "./ThemeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userExpense: expenceReducer,
    theme: themeReducer,
  },
});

export default store;
