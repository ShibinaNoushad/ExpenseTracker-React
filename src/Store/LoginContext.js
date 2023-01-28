import React, { useState } from "react";
import ExpenseContext from "./ExpenseContext";

const LoginContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
export default LoginContext;

export const LoginContextProvider = (props) => {
  const userId = localStorage.getItem("email");
  const expnCtx = useState(ExpenseContext);

  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const loginHandler = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // expnCtx.setEMaill("");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <LoginContext.Provider value={contextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};
