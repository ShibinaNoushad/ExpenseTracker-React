import React, { useEffect, useState } from "react";
import axios from "axios";
const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
});
export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
  let arr = [];
  const userId = localStorage.getItem("email");

  const [expense, setExpense] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/expense/${userId}.json`
    );
    for (const key in res.data) {
      arr.push(res.data[key]);
    }
    setExpense([...arr]);
  };
  useEffect(() => {
    getData();
  }, []);
  const addExpenseHandler = () => {
    // setExpense((prev) => {
    //   return [...prev, newExpense];
    // });
    getData();
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
