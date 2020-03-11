import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import {itemTotal} from "./cartHelpers"


const isActiv = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black", background: "#ffffff" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-success">
      <li style={{ display: "flex", width: "65%", justifyContent:"flex-start", alignItems:'center', paddingLeft:"40px", color:"white", fontFamily:"Bowlby One", fontSize:"23px"}}>
          wetreenow!
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" style={isActiv(history, "/")}>
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/shop" style={isActiv(history, "/shop")}>
          Plantation
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/cart" style={isActiv(history, "/cart")}>
          Basket <sup><small className="cart-badge">{itemTotal()}</small></sup>
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
