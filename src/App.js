import React, { useContext } from "react";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Login from "./Components/Login/Login";
import LoginContext from "./Store/LoginContext";
import { Redirect, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
function App() {
  const loginCtx = useContext(LoginContext);
  return (
    <div>
      <Route path="/" exact>
        <MyNavbar></MyNavbar>
        <Login></Login>
      </Route>
      {!loginCtx.isLoggedIn && <Redirect to="/"></Redirect>} 

      <Route path="/welcome">
        <Welcome></Welcome>
      </Route>
    </div>
  );
}

export default App;
