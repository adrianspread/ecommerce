import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActiv = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900", background: "#ffffff" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-success">
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActiv(history, "/")}>
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/shop" style={isActiv(history, "/shop")}>
          Shop
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/user/dashboard"
            style={isActiv(history, "/user/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/admin/dashboard"
            style={isActiv(history, "/admin/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signin"
              style={isActiv(history, "/signin")}
            >
              Signin
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/signup"
              style={isActiv(history, "/signup")}
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <div>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Signout
            </span>
          </li>
        </div>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
