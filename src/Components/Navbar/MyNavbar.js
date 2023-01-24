import React from "react";
import { Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import classes from "./MyNavbar.module.css";

function MyNavbar() {
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
              to="/products"
              className={classes.titlelabels}
              // activeClassName={classes.active}
            >
              Products
            </Nav.Link>
            <Nav.Link
              to="/about"
              className={classes.titlelabels}
              // activeClassName={classes.active}
            >
              About Us
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className={classes.margin}></div>
    </div>
  );
}

export default MyNavbar;
