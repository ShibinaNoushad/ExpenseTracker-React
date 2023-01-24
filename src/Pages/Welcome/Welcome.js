import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Welcome.css";

function Welcome() {
  const history = useHistory();
  const setUserProfile = () => {
    history.replace("/userProfile");
  };
  return (
    <div className="bor">
      <span className="welcome">Welcome To Expense Tracker!!!</span>
      <Button variant="secondary" className="profile" onClick={setUserProfile}>
        Your profile is incomplete.Complete Now
      </Button>
    </div>
  );
}

export default Welcome;
