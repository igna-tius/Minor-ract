import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import divStyle from "./WelcomeStyle";

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

        
        <div style = {divStyle} class="jumbotron ">
          <h1 class="display-4">Welcome {user} !<i style={{color: "#5eaaa8" }} className ="fas fa-award"></i></h1>
          <p class="lead">Step up and shoot. Either you are full of doubts or solutions. Whatever it is, you are not alone. Build your community here, contribute in your preferred areas and grow.</p>
          
          <p>You can see your Posted Queries <Link to="/queries">here</Link>.</p>
            </div>
      </div>
    );
  }
}
export default WelcomeComponent;
