import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import AuthenticationService from "./AuthenticationService";

class LogoutComponent extends Component {
  render() {
    const check = AuthenticationService.isUserLoggedIn();
    if (check === true) {
      this.props.history.push("/");
    }
    return (
      <div>
        <HeaderComponent login={true} logout={false} register={true} />
        <h1>You are logged out</h1>
        <div className="container">Thank You for Using Our Application.</div>
      </div>
    );
  }
}
export default LogoutComponent;
