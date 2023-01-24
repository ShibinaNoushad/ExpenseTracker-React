import React, { useContext } from "react";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Login from "./Components/Login/Login";
import LoginContext from "./Store/LoginContext";
import { Redirect, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import UserProfile from "./Pages/UserProfile/UserProfile";
function App() {
  const loginCtx = useContext(LoginContext);
  return (
    <div>
      <Route path="/" exact>
        <MyNavbar></MyNavbar>
        <Login></Login>
      </Route>
      {!loginCtx.isLoggedIn && <Redirect to="/"></Redirect>}
      {loginCtx.isLoggedIn && <Redirect to="/welcome"></Redirect>}


      <Route path="/welcome">
        <Welcome></Welcome>
      </Route>
      <Route path="/userProfile">
        <UserProfile></UserProfile>
      </Route>
    </div>
  );
}

export default App;