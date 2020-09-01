import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import LoginDataService from "../api/LoginDataService.js";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles/LoginComponetStyles";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      invalidCredentials: false,
      loginsuccess: false,
      vertical: "top",
      horizontal: "center",
    };
    this.hanldeChange = this.hanldeChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  hanldeChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleClose() {
    this.setState({ invalidCredentials: false, loginsuccess: false });
  }

  loginClicked(e) {
    e.preventDefault();
    LoginDataService.checkLogin(this.state.username, this.state.password)
      .then((response) => {
        console.log(response);
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );

        this.setState({
          loginsuccess: true,
        });

        this.props.fun(this.state.username);
        this.props.history.push(`welcome/${response.data.firstname}`);
      })
      .catch(
        setTimeout(() => {
          this.setState({ invalidCredentials: true });
        }, 1000)
      );
  }

  render() {
    const { classes } = this.props;
    const {
      invalidCredentials,
      vertical,
      horizontal,
      loginsuccess,
    } = this.state;
    return (
      <div>
        <HeaderComponent register={true} logout={false} login={false} />
        <main className={classes.main}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={loginsuccess}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              Login Succesfull!
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={invalidCredentials}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              Invalid Credentials!
            </Alert>
          </Snackbar>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign In</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.hanldeChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.hanldeChange}
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="secondary"
                className={classes.submit}
                onClick={this.loginClicked}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </main>
        <FooterComponent />
      </div>
    );
  }
}
export default withStyles(styles)(LoginComponent);
