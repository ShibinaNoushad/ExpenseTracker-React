import React, { useEffect, useState } from "react";
import axios from "axios";
const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
  email: "",
  setEmaill: () => {},
  editState: false,
  editObj: "",
  editExpenseState: () => {},
  editExpense: () => {},
});
export default ExpenseContext;

export const ExpenseContextProvider = (props) => {
  const [editState, setEditState] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [email, setEmail] = useState("");
  const setMyEmail = (value) => {
    setEmail(value);
  };
  let arr = [];
  const userId = localStorage.getItem("email");

  const [expense, setExpense] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}.json`
      );
      // let index = 0;
      for (const key in res.data) {
        // arr[index] = res.data[key];
        // index++;
        // arr.push(res.data[key]);
        arr.push({ ...res.data[key], id: key });
      }
      setExpense([...arr]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [email]);

  const addExpenseHandler = async (newExp) => {
    // setExpense((prev) => {
    //   return [...prev, newExpense];
    // });
    try {
      await axios.post(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}.json`,
        newExp
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const removeExpenseHandler = async (id) => {
    try {
      await axios.delete(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}/${id}.json`
      );
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const editExpenseStateHandler = (obj) => {
    setEditState(true);
    setEditObj({ ...obj });
  };
  const editExpenseHandler = async (id, obj) => {
    try {
      await axios.put(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}/${id}.json`,
        obj
      );
      getData();
      setEditState(false);
    } catch (error) {
      console.log(error);
    }
  };
  const expensesValue = {
    expenses: expense,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    email: email,
    setEmaill: setMyEmail,
    editState: editState,
    editObj: editObj,
    editExpenseState: editExpenseStateHandler,
    editExpense: editExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={expensesValue}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
