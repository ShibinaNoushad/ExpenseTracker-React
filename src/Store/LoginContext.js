import React, { useState } from "react";

const LoginContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});
export default LoginContext;

export const LoginContextProvider = (props) => {
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
