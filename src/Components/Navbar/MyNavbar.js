import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import classes from "./MyNavbar.module.css";
import LoginContext from "../../Store/LoginContext";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/AuthSlice";
import { useSelector } from "react-redux";

function MyNavbar() {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const loginCtx = useContext(LoginContext);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logoutHandler());
  };
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand className={classes.myweb}>MyWebLink</Navbar.Brand>
          <Nav className="me-auto " bg="dark" variant="dark">
            <Nav.Link
              to="/home"
              className={classes.titlelabels}
              // activeClassName={classes.active}
            >
              Home
            </Nav.Link>
            <Nav.Link
              to="/expense"
              className={classes.titlelabels}
              // activeClassName={classes.active}
            >
              Expenses
            </Nav.Link>
            <Nav.Link
              to="/about"
              className={classes.titlelabels}
              // activeClassName={classes.active}
            >
              About Us
            </Nav.Link>
          </Nav>
          {isLogin && (
            <Button variant="secondary" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Container>
      </Navbar>
      <div className={classes.margin}></div>
    </div>
  );
}

export default MyNavbar;
