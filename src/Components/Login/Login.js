import React, { useState, useRef, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import ExpenseContext from "../../Store/ExpenseContext";
import LoginContext from "../../Store/LoginContext";
import "./Login.css";

function Login() {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(false);
  const loginCtx = useContext(LoginContext);
  const expnCtx = useContext(ExpenseContext);
  const switchHandler = () => {
    setIsLogin((prev) => {
      return !prev;
    });
  };
  const forgotPasswordHandler = () => {
    history.replace("/resetpassword");
    console.log("reset");
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const formHandler = async (e) => {
    e.preventDefault();
    const userEmail = emailInputRef.current.value;
    const userPassword = passwordInputRef.current.value;
    const Email = userEmail.replace("@", "").replace(".", "");

    // const userConfirmPassword = confirmPasswordInputRef.current.value;
    if (!isLogin && userPassword !== confirmPasswordInputRef.current.value) {
      alert("password not matching");
      return;
    }
    expnCtx.setEmaill(Email);
    localStorage.setItem("email", Email);

    console.log("success");
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-1cDOSrzhXi7pQ330k-yRNDTZCPoIj1o";
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        loginCtx.login(data.idToken);
        // console.log(data);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        if (!isLogin) {
          confirmPasswordInputRef.current.value = "";
        }

        // history.replace("/welcome");
      } else {
        const data = await res.json();
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        history.replace("/");

        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error);
    }
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
          {isLogin && (
            <Button
              variant="link"
              type="button"
              className="forgotPass"
              onClick={forgotPasswordHandler}
            >
              Forgot Password
            </Button>
          )}
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
