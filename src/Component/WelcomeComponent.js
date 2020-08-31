import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";
class WelcomeComponent extends Component {
  render() {
    const user = AuthenticationService.getLoggedInUsername();
    return (
      <div>
        <HeaderComponent
          login={false}
          logout={true}
          register={false}
          logot={this.props.logot}
        />
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {user} .
          <br />
          You can see your Posted queries <Link to="/queries">here</Link>.
        </div>
      </div>
    );
  }
}
export default WelcomeComponent;
