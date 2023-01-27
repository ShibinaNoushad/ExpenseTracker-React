import React, { useContext, useState } from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ExpenseContext from "../../Store/ExpenseContext";
import "./AddExpenseForm.css";
import ExpenseDisplay from "./ExpenseDisplay";
import axios from "axios";

function AddExpenseForm() {
  const expenseCtx = useContext(ExpenseContext);
  const userId = localStorage.getItem("email");
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const addExpenseSubmitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    if (
      enteredAmount.trim().length < 0 ||
      enteredDescription.length < 4 ||
      enteredCategory == "Category"
    ) {
      alert("Please enter all fields correctly");
      return;
    }
    const newexp = {
      amount: +enteredAmount,
      description: enteredDescription,
      category: enteredCategory,
    };
    const newExp = JSON.stringify(newexp);
    console.log("clicked");
    try {
      axios.post(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/expense/${userId}.json`,
        newExp
      );
    } catch (error) {
      console.log(error);
    }
    // expenseCtx.addExpense({ ...newexp });
    expenseCtx.addExpense();
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <>
      <div className="addExpenseDiv">
        <h2>Expense Tracker</h2>

        <Form onSubmit={addExpenseSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="addExpenseLabel">Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Amount"
              className="addExpenseInput"
              ref={amountRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="addExpenseLabel">Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              className="addExpenseInput"
              ref={descriptionRef}
            />
          </Form.Group>
          <br />
          <Form.Select
            aria-label="Default select example"
            className="addExpenseInput"
            ref={categoryRef}
          >
            <option>Category</option>
            <option value="Food">Food</option>
            <option value="Movies">Movies</option>
            <option value="Fuel">Fuel</option>
            <option value="Fuel">Others</option>
          </Form.Select>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <ExpenseDisplay />
    </>
  );
}

export default AddExpenseForm;
