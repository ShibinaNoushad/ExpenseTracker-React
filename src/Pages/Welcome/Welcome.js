import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "./Welcome.css";
import LoginContext from "../../Store/LoginContext";

function Welcome() {
  // const theme = useSelector((state) => state.theme.isDark);
  // // if (theme) {
  // //   document.body.style.backgroundColor = "black";

  // //   console.log("dark");
  // // }
  // useEffect(() => {
  //   if (!theme) {
  //     document.body.style.backgroundColor = "black";
  //   }
  // }, theme);

  // document.body.style.color = "white";

  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const addExpenseHandler = () => {
    history.replace("/expense");
  };
  const verifyEmail = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        alert("Verification mail sent");
      } else {
        const data = await res.json();
        const errorMessage = "Request Failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setUserProfile = () => {
    history.replace("/userProfile");
  };
  return (
    <>
      <div className="bor">
        <span className="welcome">Welcome To Expense Tracker!!!</span>
        <Button variant="primary" className="profile" onClick={setUserProfile}>
          Your profile is incomplete.Complete Now
        </Button>
        <Button variant="primary" className="verify" onClick={verifyEmail}>
          Verify Email
        </Button>{" "}
        <br />
        <Button
          variant="primary"
          className="addExpensebtn"
          onClick={addExpenseHandler}
        >
          Add Expense
        </Button>
      </div>
    </>
  );
}

export default Welcome;
