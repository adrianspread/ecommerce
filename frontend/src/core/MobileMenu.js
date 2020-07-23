import React, { Fragment } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import Hamburger from "./menu.svg";



const isActiv = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black", background: "#ffffff" };
  } else {
    return { color: "#ffffff" };
  }
};

const MobileMenu = (props) => (
    <>
        <div className={props.move}>
            <ul className="nav nav-tabs bg-success" style={{display: "block", width: "100%", borderBottom: "0px"}} onClick={props.onClick}>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={isActiv(props.history, "/")}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/shop" style={isActiv(props.history, "/shop")}>
                  Plantation
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart" style={isActiv(props.history, "/cart")}>
                  Basket
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
                    style={isActiv(props.history, "/user/dashboard")}
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
                    style={isActiv(props.history, "/admin/dashboard")}
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
                      style={isActiv(props.history, "/signin")}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/signup"
                      style={isActiv(props.history, "/signup")}
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
                          props.history.push("/");
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
    </>
);

export default withRouter(MobileMenu);
