import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./PremiumButton.css";

function PremiumButton() {
  let amount = 0;
  const arr = useSelector((state) => state.userExpense.expenses);
  arr.forEach((element) => {
    amount = amount + element.amount;
  });
  return (
    <div className="preDiv">
      {amount >= 10000 ? (
        <Button className="preButton">Activate Premium</Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PremiumButton;
