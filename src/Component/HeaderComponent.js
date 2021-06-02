import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class HeaderComponent extends Component {
  render() {
    const { logout, login, register } = this.props;
    return (
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-dark "
          style={{ backgroundColor: "#5eaaa8" }}
        >
          <Link to="/" className="navbar-brand">
            Tech Canvass
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/welcome/${this.props.user}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <Link className="nav-link" to="/queries">
                  My Queries
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/addquery">
                  Post Query
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/feeds">
                  Feeds
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {register && (
                <li>
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {login && (
                <li>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {logout && (
                <li>
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={this.props.logot}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
export default HeaderComponent;
