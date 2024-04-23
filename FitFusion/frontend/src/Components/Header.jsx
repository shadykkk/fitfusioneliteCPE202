import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../Actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/login")
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <Navbar.Brand as={Link} to="/" style={{ textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>
  <b>FitFUSION ELITE</b>
</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link
                to="/"
                type="button"
                className="btn btn-black"
              >
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </Link>
              <Link
                to="/genres"
                type="button"
                className="btn btn-black"
              >
                <i className="fa fa-video-camera" aria-hidden="true"></i> Categories
              </Link>
              <Link
                to="/mylist"
                type="button"
                className="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i className="fa fa-list-ul" aria-hidden="true"></i> My List
              </Link>
              {userInfo ? (
                !userInfo.isAdmin ? (
                  <div />
                ) : (
                  <Link
                    to="/movielist"
                    type="button"
                    className="btn btn-black"
                    style={{ color: "#FFF" }}
                  >
                    <i className="fa fa-list-ul" aria-hidden="true"></i> Workout List
                  </Link>
                )
              ) : (
                <div />
              )}
              {userInfo ? (
                !userInfo.isAdmin ? (
                  <div />
                ) : (
                  <Link
                    to="/userlist"
                    type="button"
                    className="btn btn-black"
                    style={{ color: "#FFF" }}
                  >
                    <i className="fa fa-list-ul" aria-hidden="true"></i> User List
                  </Link>
                )
              ) : (
                <div />
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Link
                to="/plans"
                type="button"
                className="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i className="fa-solid fa-ticket"></i> Plan
              </Link>
              {userInfo ? (
                <Link
                  to="/userprofile"
                  type="button"
                  className="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fas fa-user"></i> {userInfo.first_name} {""}
                  {userInfo.last_name}
                </Link>
              ) : (
                <Link
                  to="/signup"
                  type="button"
                  className="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fa-solid fa-user-plus"></i> Sign up
                </Link>
              )}
              {userInfo ? (
                <Link
                  onClick={logoutHandler}
                  type="button"
                  className="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fas fa-user"></i> Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
