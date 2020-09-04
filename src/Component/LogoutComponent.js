import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import AuthenticationService from "./AuthenticationService";
import FooterComponent from "./FooterComponent";

class LogoutComponent extends Component {
  render() {
    const check = AuthenticationService.isUserLoggedIn();
    if (check === true) {
      this.props.history.push("/");
    }
    return (
      <div>
        <HeaderComponent login={true} logout={false} register={true} />
        <div
          style={{
            margin: 100,
            marginTop: "30px",
            color: "dark cyan",
            backgroundColour: "#5eaaa8",
            width: "85%",
            lineHeight: "3",
            padding: "10",
            height: "50",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          class="jumbotron "
        >
          <h1 class="display-4">You are logged out.</h1>
          <div className="container">Thank You for Using Our Application.</div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}
export default LogoutComponent;
