import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
// import Button from "react-bootstrap";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const switchHandler = () => {
    setIsLogin((prev) => {
      return !prev;
    });
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();
    const userEmail = emailInputRef.current.value;
    const userPassword = passwordInputRef.current.value;
    // const userConfirmPassword = confirmPasswordInputRef.current.value;
    if (!isLogin && userPassword != confirmPasswordInputRef.current.value) {
      alert("password not matching");
      return;
    }
    console.log("success");
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (!isLogin) {
          confirmPasswordInputRef.current.value = "";
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="">
      <img src={require("./blue.jpg")} alt="img" className="backgroundDiv" />
      <div className="loginBox">
        <h1 className="inputHeading">{isLogin ? "Login" : "Sign Up"}</h1>
        <Form onSubmit={formHandler}>
          <Form.Group className="mb-2 loginInput">
            <Form.Control
              type="email"
              placeholder="email"
              ref={emailInputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3 loginInput">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordInputRef}
            />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3 loginInput">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordInputRef}
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="loginbtn">
            {isLogin ? "Login" : "Sign up"}
          </Button>
          <div>
            <Button
              variant="primary"
              type="button"
              className="AlreadyLogin"
              onClick={switchHandler}
            >
              {isLogin
                ? "Don't  have an account?Sign up"
                : "Have an account Login"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
