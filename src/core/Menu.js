import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            U.DashBoard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A.DashBoard
          </Link>
        </li>
      )}
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              SignIn
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              SignUp
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <span
          className="nav-link text-warning"
          onClick={() => {
            signout(() => {
              history.push("/");
            });
          }}
        >
          Signout
        </span>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
