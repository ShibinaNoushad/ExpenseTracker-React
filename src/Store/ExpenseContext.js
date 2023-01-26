import React, { useEffect, useState } from "react";
import ExpenseDisplay from "../Pages/AddExpense/ExpenseDisplay";
const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (exp) => {},
  removeExpense: () => {},
});
export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
  const [expense, setExpense] = useState([]);
  const addExpenseHandler = (newExpense) => {
    setExpense((prev) => {
      return [...prev, newExpense];
    });
  };
  const removeExpenseHandler = () => {};
  useEffect(() => {
    console.log(expense);
  }, [expense]);

  const expensesValue = {
    expenses: expense,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expensesValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
