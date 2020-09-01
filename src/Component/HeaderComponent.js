import React, { Component } from "react";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
  render() {
    const { logout, login, register } = this.props;
    return (
      <header>
        <nav
          className="navbar navbar-expand-md navbar-dark "
          style={{ backgroundColor: "#5eaaa8" }}
        >
          <div>
            <a href="www.google.com" className="navbar-brand">
              Queries ELucidator
            </a>
          </div>
          <ul className="navbar-nav">
            <li>
              <Link className="nav-link" to={`/welcome/${this.props.user}`}>
                Home
              </Link>
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
        </nav>
      </header>
    );
  }
}
export default HeaderComponent;
