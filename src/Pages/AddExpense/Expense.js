import React, { useContext } from "react";
import "./ExpenseDisplay.css";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
import ExpenseContext from "../../Store/ExpenseContext";

function Expense(props) {
  const expenseCtx = useContext(ExpenseContext);
  const editExpense = () => {
    expenseCtx.editExpenseState(props.elem);
  };
  const deleteExpense = async () => {
    expenseCtx.removeExpense(props.elem.id);
  };
  return (
    <div className="cont">
      <span className="expdes">{props.elem.description}</span>
      <span className="expCat">{props.elem.category}</span>
      <span className="expAmount">
        <Button className="moneyItemslabel">{props.elem.amount}</Button>
      </span>
      <Button className="editexp" onClick={editExpense}>
        Edit
      </Button>
      <CloseButton className="delexp" onClick={deleteExpense}></CloseButton>
      <hr />
    </div>
  );
}

export default Expense;
