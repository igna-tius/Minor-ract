import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginRoute from "./LoginRoute";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import QueriesComponent from "./QueriesComponent";
import EditQuery from "./EditQuery";
import AddQuery from "./AddQuery";
import AuthenticationService from "./AuthenticationService";
import FeedComponent from "./FeedComponent";
import SignUp from "./SignUp";
import SingleQueryComponent from "./SingleQueryComponent";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/CompleteAppStyles";
import AnswerComponent from "./AnswerComponent";
import PostAnswerComponent from "./PostAnswerComponent";

/*  
Developed BY:Shubham Dalal
email:dshubh2015@gmail.com
this manages routes.
*/

class CompleteApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user: AuthenticationService.getLoggedInUsername(),
    };
    this.hasLoggedIn = this.hasLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  hasLoggedIn(name) {
    this.setState({
      login: true,
      user: name,
    });
  }

  logout() {
    AuthenticationService.logout();
    this.setState({
      login: false,
      user: "",
    });
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Router>
          <div className={classes.root}>
            <Switch>
              <LoginRoute
                exact
                path="/"
                render={(routeProps) => (
                  <LoginComponent
                    {...routeProps}
                    fun={this.hasLoggedIn}
                    logot={this.logout}
                  />
                )}
              />
              <LoginRoute
                path="/login"
                render={(routeProps) => (
                  <LoginComponent
                    {...routeProps}
                    fun={this.hasLoggedIn}
                    logot={this.logout}
                  />
                )}
              />
              <LoginRoute
                path="/register"
                render={(routeProps) => (
                  <SignUp
                    {...routeProps}
                    fun={this.hasLoggedIn}
                    logot={this.logout}
                  />
                )}
              />
              <AuthenticatedRoute
                path={`/welcome`}
                render={(routeProps) => (
                  <WelcomeComponent
                    {...routeProps}
                    user={this.state.user}
                    logot={this.logout}
                  />
                )}
              />
              <AuthenticatedRoute
                path="/addquery"
                render={(routeProps) => (
                  <AddQuery {...routeProps} logot={this.logout} user={user} />
                )}
              />
              <AuthenticatedRoute
                path="/singlequery/:id"
                render={(routeProps) => (
                  <SingleQueryComponent {...routeProps} logot={this.logout} />
                )}
              />
              <AuthenticatedRoute
                path="/queries/:id"
                render={(routeProps) => (
                  <EditQuery {...routeProps} logot={this.logout} />
                )}
              />
              <AuthenticatedRoute
                path="/queries"
                render={(routeProps) => (
                  <QueriesComponent {...routeProps} logot={this.logout} />
                )}
              />
              <AuthenticatedRoute
                exact
                path="/postanswer/:id/"
                render={(routeProps) => (
                  <LoginComponent {...routeProps} logot={this.logout} />
                )}
              />
              <AuthenticatedRoute
                path="/postanswer/:id/:username"
                render={(routeProps) => (
                  <PostAnswerComponent {...routeProps} logot={this.logout} />
                )}
              />
              <Route
                path="/answerquery/:username/:id"
                render={(routeProps) => (
                  <AnswerComponent {...routeProps} logot={this.logout} />
                )}
              />
              <Route
                path="/feeds"
                render={(routeProps) => (
                  <FeedComponent {...routeProps} logot={this.logout} />
                )}
              />
              <Route
                path="/logout"
                render={(routeProps) => (
                  <LogoutComponent
                    {...routeProps}
                    log={this.state.login}
                    fun={this.hasLoggedIn}
                  />
                )}
              />
              <Route component={ErrorComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

function ErrorComponent() {
  return <div>I don't know what happend.Contact Help center.</div>;
}

export default withStyles(styles)(CompleteApp);
