import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AuthenticationService from "./AuthenticationService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: AuthenticationService.getLoggedInUsername(),
      vertical: "bottom",
      horizontal: "center",
      open: true,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    const { open, vertical, horizontal } = this.state;
    return (
      <div>
        <HeaderComponent
          login={false}
          logout={true}
          register={false}
          logot={this.props.logot}
        />

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="success">
            Login Succesfull!
          </Alert>
        </Snackbar>

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
          <h1 class="display-4">Welcome {this.state.username}!</h1>
          <p class="lead">
            Step up and shoot. Either you are full of doubts or solutions.
            Whatever it is, you are not alone. Build your community here,
            contribute in your preferred areas and grow.
          </p>

          <p>
            You can see your Posted Queries <Link to="/queries">here</Link>.
          </p>
        </div>
      </div>
    );
  }
}
export default WelcomeComponent;
