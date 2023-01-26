import React from "react";
import "./ExpenseDisplay.css";

function Expense(props) {
  return (
    <div >
      <span className="expdes">{props.elem.description}</span>
      <span className="expCat">{props.elem.category}</span>
      <span className="expAmount">
        <label className="moneyItemslabel">{props.elem.amount}</label>
      </span>
      <hr />
    </div>
  );
}

export default Expense;
