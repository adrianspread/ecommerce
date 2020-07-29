import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Hamburger from "./menu.svg";
import MobileMenu from "./MobileMenu";

function Menu(props) {
  const [navOpen, setNavOpen] = useState(false);
  const [move, setMove] = useState("mobile-menu");
  const history = props.history;

  const isActiv = (history, path) => {
    if (history.location.pathname === path) {
      return {
        color: "black",
        background: "#ffffff",
        border: "1px solid white"
      };
    } else {
      return { color: "#ffffff" };
    }
  };

  return (
    <>
      <MobileMenu move={move} onClick={() => setMove("mobile-menu")} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#28A745",
          height: "43px"
        }}
      >
        <div className="logo">wetreenow!</div>
        <ul className="nav nav-tabs bg-success desktop-only">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={isActiv(history, "/")}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/shop"
              style={isActiv(history, "/shop")}
            >
              Plantation
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/card"
              style={isActiv(history, "/card")}
            >
              Basket{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
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
                  Login
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
            <>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  Signout
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="hamburger" onClick={() => setMove("mobile-menu move")}>
          <img src={Hamburger} className="icon" />
        </div>
      </div>
    </>
  );
}

export default withRouter(Menu);
