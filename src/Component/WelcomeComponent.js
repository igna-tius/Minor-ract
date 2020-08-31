import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const user = AuthenticationService.getLoggedInUsername();
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
