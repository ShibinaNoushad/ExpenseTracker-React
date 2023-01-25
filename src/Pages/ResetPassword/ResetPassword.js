import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const history = useHistory();
  const enteredEmail = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const sendLink = async () => {
    const userEmail = enteredEmail.current.value;
    if (userEmail.length < 8) {
      alert("Please enter the email");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: userEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        setIsLoading(false);

        const data = await res.json();
        alert("Link Is Sent Successfully");

        // console.log(data);
      } else {
        const data = await res.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  };
  const cancelForgotPassword = () => {
    history.replace("/");
  };
  return (
    <div className="resetBackground">
      <div className="resetDiv">
        <h2>Reset Password</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="resetLabel">
              Enter the email with which you have resgistered
            </Form.Label>
            <Form.Control
              type="text"
              className="resetInput"
              ref={enteredEmail}
            />
          </Form.Group>
          <Button
            variant="outline-primary"
            className="resetBtn"
            type="button"
            onClick={sendLink}
          >
            {!isLoading ? "Send Link" : "Sending"}
          </Button>{" "}
          <Button
            variant="outline-danger"
            onClick={cancelForgotPassword}
            type="button"
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
