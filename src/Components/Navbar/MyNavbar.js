import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import classes from "./MyNavbar.module.css";
import { expenseActions } from "../../Store/ExpenseSlice";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/AuthSlice";
import { useSelector } from "react-redux";
import { themeActions } from "../../Store/ThemeSlice";

function MyNavbar() {
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const showToggle = useSelector((state) => state.theme.isToggle);
  const theme = useSelector((state) => state.theme.isDark);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logoutHandler());
    dispatch(authActions.clearEmail());
    dispatch(expenseActions.getData([]));
    dispatch(themeActions.setLight());
    dispatch(themeActions.hideToggleButton());
  };
  const switchTheme = () => {
    dispatch(themeActions.setDark());
  };
  return (
    <div>
      <Navbar
        bg={!theme ? "light" : "black"}
        variant={!theme ? "light" : "black"}
      >
        <Container>
          <Navbar.Brand className={classes.myweb}>MyWebLink</Navbar.Brand>
          <Nav className="me-auto ">
            {isLogin && (
              <>
                <NavLink to="/welcome" className={classes.titlelabels}>
                  Home
                </NavLink>
                <NavLink to="/expense" className={classes.titlelabels}>
                  Expenses
                </NavLink>
                <NavLink to="/about" className={classes.titlelabels}>
                  About Us
                </NavLink>
              </>
            )}
          </Nav>

          {isLogin && showToggle && (
            <Button
              variant="info"
              className={classes.logout}
              onClick={switchTheme}
            >
              Toggle
            </Button>
          )}

          {isLogin && (
            <Button
              variant="info"
              className={classes.logout}
              onClick={logoutHandler}
            >
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
