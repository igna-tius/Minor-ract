import React, { Component } from "react";
import QueryDataService from "../api/QueryDataService.js";
import AuthenticationService from "./AuthenticationService.js";

import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

import QueryCard from "../Component/QueryCard";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class QueriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      message: "",
      open: false,
      vertical: "top",
      horizontal: "center",
    };
    this.deleteQueryClicked = this.deleteQueryClicked.bind(this);
    this.updateQueryClicked = this.updateQueryClicked.bind(this);
    this.refreshQuery = this.refreshQuery.bind(this);
    this.selectQuery = this.selectQuery.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.refreshQuery();
  }

  handleClose() {
    this.setState({ open: false });
  }

  selectQuery(user, id) {
    this.props.history.push(`/singlequery/${id}`);
    console.log(id);
  }

  deleteQueryClicked(id) {
    let username = AuthenticationService.getLoggedInUsername();
    QueryDataService.deleteQuery(username, id).then((response) => {
      this.setState({
        message: `Delete of Query ${id} Successful`,
        open: true,
      });
      this.refreshQuery();
    });
  }

  updateQueryClicked(id) {
    this.props.history.push(`/queries/${id}`);
  }

  refreshQuery() {
    let username = AuthenticationService.getLoggedInUsername();
    QueryDataService.retriveAllQuery(username).then((response) => {
      this.setState({
        queries: response.data,
      });
      console.log(response.data);
    });
  }

  render() {
    const querieslist = this.state.queries.map((m) => (
      <QueryCard
        query={m}
        deleteQuery={this.deleteQueryClicked}
        editQuery={this.updateQueryClicked}
        editable={true}
        selectQuery={this.selectQuery}
      />
    ));

    const check = AuthenticationService.isUserLoggedIn();
    const { vertical, horizontal } = this.state;
    return (
      <div>
        <HeaderComponent
          register={!check}
          logout={check}
          login={!check}
          logot={this.props.logot}
        />
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
          <div>
            <h2>Queries</h2>

            <div style={{ float: "Right", marginBottom: "10px" }}>
              <Link to="/addquery">
                <Fab
                  style={{
                    backgroundColor: "#5eaaa8",
                    marginRight: "10px",
                  }}
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Link>
              <Fab style={{ backgroundColor: "#5eaaa8" }} aria-label="add">
                <RefreshIcon onClick={this.refreshQuery} />
              </Fab>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={this.state.open}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="success">
              {this.state.message}
            </Alert>
          </Snackbar>
          {this.state.queries.length === 0 && (
            <h1 class="display-4" style={{ marginTop: "100px" }}>
              No Query Posted by you.
            </h1>
          )}
          {!(this.state.queries.length === 0) && (
            <div className="container">{querieslist}</div>
          )}
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default QueriesComponent;
