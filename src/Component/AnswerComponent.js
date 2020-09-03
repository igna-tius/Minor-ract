import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import QueryDataService from "../api/QueryDataService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles/SingleQueryStyles";

import EditIcon from "@material-ui/icons/Edit";
import { Card } from "react-bootstrap";
import Chip from "@material-ui/core/Chip";

import AddIcon from "@material-ui/icons/Add";

import SolutionComponent from "./SolutionComponent";

class AnswerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      postedBy: this.props.match.params.username,
      username: AuthenticationService.getLoggedInUsername(),
      query: {},
      solutions: [],
      categories: [],
    };
    this.addAnswer = this.addAnswer.bind(this);
  }

  componentDidMount() {
    const username = this.state.postedBy;
    QueryDataService.retrieveQuery(username, this.state.id).then((response) =>
      this.setState({
        query: response.data,
        categories: response.data.categoryList,
      })
    );
    QueryDataService.retriveSolutions(this.state.id).then((response) =>
      this.setState({
        solutions: response.data,
        len: response.data.length,
      })
    );
  }

  addAnswer() {
    this.props.history.push(
      `/postanswer/${this.state.id}/${this.state.username}`
    );
  }

  render() {
    const { query, categories } = this.state;
    const { classes } = this.props;
    const check = AuthenticationService.isUserLoggedIn();
    let sas = this.state.solutions.sort(function (a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      console.log(dateA, dateB);
      return dateB - dateB;
    });
    console.log(sas);
    const sol =
      this.state.len > 0 ? (
        sas.map((c) => <SolutionComponent solution={c} key={c.title} />)
      ) : (
        <h4 style={{ border: "30px" }}>No Solution Posted Yet.Post Solution</h4>
      );
    return (
      <div>
        <HeaderComponent
          login={!check}
          register={!check}
          logout={check}
          logot={this.props.logot}
        />
        <div className={classes.main}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
            }}
            onClick={this.addAnswer}
          >
            <Chip
              icon={<AddIcon variant="outlined" />}
              label="Post Answer"
              style={{ backgroundColor: "#5eaaa8" }}
            />
          </div>
          <div className={classes.query}>
            <Paper
              className={classes.paper}
              style={{
                marginTop: "20px",
              }}
            >
              <Card
                style={{
                  textAlign: "left",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                <Card.Header>
                  <div
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    {query.title}
                    <span style={{ float: "right" }}>
                      <EditIcon />
                      {query.username}
                    </span>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{query.description}</Card.Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "left",
                      flexWrap: "wrap",
                    }}
                  >
                    {categories.map((cat) => (
                      <Chip
                        key={cat}
                        id={cat}
                        style={{
                          margin: "2px",
                          backgroundColor: "#1C8EF9",
                          color: "white",
                        }}
                        label={cat}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {sol}
            </Paper>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default withStyles(styles)(AnswerComponent);
