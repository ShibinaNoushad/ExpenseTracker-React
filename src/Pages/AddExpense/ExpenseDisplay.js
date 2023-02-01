import React from "react";
import Card from "../../Components/Card/Card";
import Expense from "./Expense";
import "./ExpenseDisplay.css";
import { useSelector } from "react-redux";

function ExpenseDisplay(props) {
  const expenses = useSelector((state) => state.userExpense.expenses);
  const editData = (editObj) => {
    props.editExpense(editObj);
  };

  return (
    <Card>
      {expenses.map((elem) => (
        <Expense
          elem={elem}
          key={Math.random().toString()}
          getData={props.getData}
          editExpense={editData}
        ></Expense>
      ))}
    </Card>
  );
}

export default ExpenseDisplay;
