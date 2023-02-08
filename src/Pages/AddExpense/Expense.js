import React, { useState } from "react";
import "./ExpenseDisplay.css";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";

function Expense(props) {
  const [deleteco, setDeleting] = useState("Delete");
  const userId = localStorage.getItem("email");
  const editExpense = () => {
    props.editExpense(props.elem);
  };
  const deleteExpense = async () => {
    setDeleting("Deleting...");
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
      <Button variant="primary" className="editexp" onClick={editExpense}>
        Edit
      </Button>
      <Button className="delexp" onClick={deleteExpense}>
        {deleteco}
      </Button>
      <hr style={{ color: "gray" }} />
    </div>
  );
}

export default Expense;
