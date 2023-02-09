import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./PremiumButton.css";
import { themeActions } from "../../Store/ThemeSlice";

function PremiumButton() {
  const dispatch = useDispatch();
  let amount = 0;
  const arr = useSelector((state) => state.userExpense.expenses);
  arr.forEach((element) => {
    amount = amount + element.amount;
  });
  const activateToggle = () => {
    dispatch(themeActions.showToggleButton());
  };
  // if (amount < 10000) {
  //   dispatch(themeActions.hideToggleButton());
  // }
  return (
    <div className="preDiv">
      {amount >= 10000 ? (
        <Button className="preButton" onClick={activateToggle}>
          Activate Premium
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PremiumButton;
