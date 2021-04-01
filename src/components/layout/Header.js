import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import "../../App.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            {/* <img src="" alt="photo" /> */}
            <Link to="/">
              <span style={{ color: "white" }}>Enyxs Sport</span>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="mr-2">
              Cart
            </span>
            <span className="mr-5 " id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    className="rounded-circle"
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                style={{ top: "unset" }}
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  onClick={logoutHandler}
                  className="dropdown-item text-danger"
                  to="/"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login">
                <button className="btn" id="login_btn">
                  Login
                </button>
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
