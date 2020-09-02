import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

import QueryDataService from "../api/QueryDataService";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles/AddQueryStyles";

import AuthenticationService from "./AuthenticationService";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qid: this.props.match.params.id,
      username: this.props.match.params.username,
      sid: "",
      title: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSolution = this.addSolution.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isEnough", (value) =>
      value.length > 20 ? true : false
    );
    ValidatorForm.addValidationRule("isTag", (value) =>
      this.state.categoryList.length > 0 ? true : false
    );
  }

  addSolution() {
    const { qid, sid, username, title, description } = this.state;
    const solution = {
      qid,
      sid,
      username,
      title,
      description,
      date: new Date(),
    };
    console.log(solution);
    QueryDataService.postSolution(solution, username, qid).then((response) => {
      console.log(response.data);
    });
    this.props.history.push("/feeds");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { qid, sid, username, title, description } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <HeaderComponent
          login={false}
          register={false}
          logout={true}
          logot={this.props.logot}
        />
        <main className={classes.main}>
          <Paper className={classes.paper} style={{ marginTop: "20px" }}>
            <Avatar className={classes.avatar}>
              <QuestionAnswerIcon />
            </Avatar>
            <Typography variant="h5">Post Solution</Typography>
            <ValidatorForm
              className={classes.form}
              style={{
                marginTop: "5px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
              instantValidate={false}
              onSubmit={this.addSolution}
            >
              <TextValidator
                fullWidth
                autoFocus
                placeholder="Title"
                name="title"
                margin="normal"
                value={this.state.title}
                onChange={this.handleChange}
                validators={["required", "isEnough"]}
                errorMessages={[
                  "Enter a Title",
                  "Title must have 15 characters.",
                ]}
              />

              <TextValidator
                fullWidth
                autoFocus
                placeholder="Description"
                id="standard-multiline-flexible"
                name="description"
                multiline
                rows={10}
                variant="filled"
                value={this.state.description}
                onChange={this.handleChange}
                validators={["required", "isEnough"]}
                errorMessages={[
                  "Enter a Description",
                  "Description must have 15 characters.",
                ]}
              />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="secondary"
                className={classes.submit}
              >
                Save
              </Button>
            </ValidatorForm>
          </Paper>
        </main>
        <FooterComponent />
      </div>
    );
  }
}

export default withStyles(styles)(PostComponent);
