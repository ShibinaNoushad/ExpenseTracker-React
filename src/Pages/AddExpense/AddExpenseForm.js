import React, { useContext, useState } from "react";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ExpenseContext from "../../Store/ExpenseContext";
import "./AddExpenseForm.css";
import ExpenseDisplay from "./ExpenseDisplay";

function AddExpenseForm() {
  const expenseCtx = useContext(ExpenseContext);
  const [expense, setExpense] = useState(false);
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
    console.log("clicked");
    expenseCtx.addExpense({ ...newexp });
    setExpense(true);
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
      {expense && <ExpenseDisplay />}
    </>
  );
}

export default AddExpenseForm;
