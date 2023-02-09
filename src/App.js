import React, { useContext } from "react";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Login from "./Components/Login/Login";
import About from "./Pages/About/About";
import { Redirect, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import UserProfile from "./Pages/UserProfile/UserProfile";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AddExpenseForm from "./Pages/AddExpense/AddExpenseForm";
import { useSelector } from "react-redux";
import "./App.css";
function App() {
  const lightTheme = useSelector((state) => state.theme.isDark);
  // document.body.style.backgroundColor='black'

  const isLogin = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className={!lightTheme ? "light" : "dark"}>
      <MyNavbar></MyNavbar>

      <Route path="/" exact>
        <Login></Login>
      </Route>
      <Route path="/expense">
        <AddExpenseForm></AddExpenseForm>
      </Route>
      {isLogin && (
        <Route path="/expense">
          <AddExpenseForm></AddExpenseForm>
        </Route>
      )}
      {!isLogin && <Redirect to="/"></Redirect>}
      {isLogin && <Redirect to="/welcome"></Redirect>}

      <Route path="/welcome">
        <Welcome></Welcome>
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/userProfile">
        <UserProfile></UserProfile>
      </Route>
      <Route path="/resetpassword">
        <ResetPassword></ResetPassword>
      </Route>
    </div>
  );
}

export default App;
