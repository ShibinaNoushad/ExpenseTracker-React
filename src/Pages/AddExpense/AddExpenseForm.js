import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "./AddExpenseForm.css";
import ExpenseDisplay from "./ExpenseDisplay";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/ExpenseSlice";
import PremiumButton from "./PremiumButton";

function AddExpenseForm() {
  const theme = useSelector((state) => state.theme.isDark);
  // // useEffect(() => {
  //   if (theme) {
  //     document.body.style.backgroundColor = "black";
  //   }
  // // }, [theme]);

  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState("");
  const userId = localStorage.getItem("email");
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const email = useSelector((state) => state.auth.email);
  const expenseItems = useSelector((state) => state.userExpense.expenses);
  const showToggle = useSelector((state) => state.theme.isToggle);

  let arr = [];
  const items = expenseItems.forEach((element) => {
    arr.push({
      Amount: element.amount,
      Category: element.category,
      Description: element.description,
    });
  });
  const csvData = [...arr];
  const getData = async () => {
    let arr = [];
    try {
      const res = await axios.get(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}.json`
      );
      for (const key in res.data) {
        console.log(res.data[key], key);
        arr.push({ ...res.data[key], id: key });
      }
      dispatch(expenseActions.getData([...arr]));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   getData();
  // }, [email]);

  const editExpense = (editObj) => {
    setEditId(editObj.id);
    setEditState(true);
    amountRef.current.value = editObj.amount;
    descriptionRef.current.value = editObj.description;
    categoryRef.current.value = editObj.category;
  };

  const addExpenseSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;
    if (
      enteredAmount.trim().length <= 0 ||
      enteredDescription.trim().length <= 0 ||
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
    if (editState) {
      try {
        await axios.put(
          `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}/${editId}.json`,
          newExp
        );
        getData();
        setEditId(null);
      } catch (error) {
        console.log(error);
      }

      amountRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
      return;
    }

    try {
      await axios.post(
        `https://expensetracker-2142b-default-rtdb.firebaseio.com/expense/${userId}.json`,
        newExp
      );
      getData();
    } catch (error) {
      console.log(error);
    }
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    // <div className="fulldiv">
    <div className={theme ? "changebgblack" : "changebgwhite"}>
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
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </Form.Select>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <ExpenseDisplay getData={getData} editExpense={editExpense} />
      <PremiumButton></PremiumButton>
      {showToggle && (
        <CSVLink data={csvData}>
          <Button variant="outline-success" className="download">
            🡇 Download file
          </Button>
        </CSVLink>
      )}
    </div>
  );
}

export default AddExpenseForm;
