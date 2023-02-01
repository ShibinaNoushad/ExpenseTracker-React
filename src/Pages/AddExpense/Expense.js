import React from "react";
import "./ExpenseDisplay.css";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";

function Expense(props) {
  const userId = localStorage.getItem("email");
  const editExpense = () => {
    props.editExpense(props.elem);
  };
  const deleteExpense = async () => {
    try {
      await axios.delete(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}/${props.elem.id}.json`
      );
      props.getData();
    } catch (error) {
      console.log(error);
    }
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
