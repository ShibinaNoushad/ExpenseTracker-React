import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Welcome.css";
import LoginContext from "../../Store/LoginContext";

function Welcome() {
  const history = useHistory();
  const loginCtx = useContext(LoginContext);
  const verifyEmail = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: loginCtx.token,
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
      alert(error);
    }
  };
  const setUserProfile = () => {
    history.replace("/userProfile");
  };
  return (
    <>
      <div className="bor">
        <span className="welcome">Welcome To Expense Tracker!!!</span>
        <Button
          variant="secondary"
          className="profile"
          onClick={setUserProfile}
        >
          Your profile is incomplete.Complete Now
        </Button>
        <Button variant="primary" className="verify" onClick={verifyEmail}>
          Verify Email
        </Button>
      </div>
    </>
  );
}

export default Welcome;
