import React, { useContext } from "react";
import Card from "../../Components/Card/Card";
import ExpenseContext from "../../Store/ExpenseContext";
import Expense from "./Expense";
import "./ExpenseDisplay.css";
function ExpenseDisplay(props) {
  const expenseCtx = useContext(ExpenseContext);
  return (
    <Card>
      {expenseCtx.expenses.map((elem) => (
        <Expense elem={elem} key={Math.random().toString() }></Expense>
      ))}
    </Card>
  );
}

export default ExpenseDisplay;
