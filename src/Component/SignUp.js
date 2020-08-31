import React, { Component } from "react";

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

import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
    };
    this.hanldeChange = this.hanldeChange.bind(this);
    this.registerClicked = this.registerClicked.bind(this);
  }

  registerClicked(e) {
    e.preventDefault();
    const msg =
      this.state.firstname +
      " " +
      this.state.lastname +
      " " +
      this.state.username +
      " " +
      this.state.password;
    alert(msg);
  }

  hanldeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const check = AuthenticationService.isUserLoggedIn();
    if (check === true) {
      this.props.history.push("/");
    }
    const { classes } = this.props;
    return (
      <div>
        <HeaderComponent login={true} register={false} logout={false} />
        <main className={classes.main}>
          <Paper className={classes.paper} style={{ marginTop: "30px" }}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign Up</Typography>
            <form className={classes.form}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "0px",
                  justifyContent: "space-between",
                }}
              >
                <FormControl margin="normal" required style={{ width: "47%" }}>
                  <InputLabel htmlFor="firstname">Firstname</InputLabel>
                  <Input
                    id="firstname"
                    name="firstname"
                    autoFocus
                    value={this.state.firstname}
                    onChange={this.hanldeChange}
                  />
                </FormControl>
                <FormControl
                  margin="normal"
                  required
                  style={{
                    width: "47%",
                    flexDirection: "right",
                  }}
                >
                  <InputLabel htmlFor="password">Lastname</InputLabel>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.hanldeChange}
                  />
                </FormControl>
              </div>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.hanldeChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.hanldeChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.hanldeChange}
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
                className={classes.submit}
                onClick={this.registerClicked}
              >
                Sign up
              </Button>
              <p
                className="forgot-password text-right"
                style={{ marginBottom: "-10px" }}
              >
                Already registered <Link to="/">sign in?</Link>
              </p>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}
export default withStyles(styles)(SignUp);
