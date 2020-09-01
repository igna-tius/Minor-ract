import React, { Component } from "react";
import QueryDataService from "../api/QueryDataService";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles/AddQueryStyles";

import AddIcon from "@material-ui/icons/Add";

import Chip from "@material-ui/core/Chip";

import { v4 as uuidv4 } from "uuid";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class EditQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: AuthenticationService.getLoggedInUsername(),
      id: this.props.match.params.id,
      title: "",
      description: "",
      categoryList: [],
      category: "",
      date: "",
    };
    this.submitClicked = this.submitClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addLabel = this.addLabel.bind(this);
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedInUsername();
    QueryDataService.retrieveQuery(username, this.state.id).then((response) =>
      this.setState({
        title: response.data.title,
        description: response.data.description,
        categoryList: response.data.categoryList,
        date: response.data.date,
      })
    );

    ValidatorForm.addValidationRule("isEnough", (value) =>
      value.length > 20 ? true : false
    );
    ValidatorForm.addValidationRule("isTag", (value) =>
      this.state.categoryList.length > 0 ? true : false
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addLabel(e) {
    e.preventDefault();
    var category = this.state.category;
    if (!this.state.categoryList.includes(category) && category.length > 0)
      this.setState(
        {
          categoryList: [...this.state.categoryList, category],
          category: "",
        },
        this.handleCheck
      );
    this.setState({
      category: "",
    });
  }

  deleteTag(label) {
    var tg = this.state.categoryList.filter((cat) => cat !== label);
    this.setState({
      categoryList: tg,
    });
  }
  submitClicked() {
    this.setState({
      date: new Date(),
    });
    const { id, username, title, description, categoryList, date } = this.state;
    const query = { id, username, title, description, categoryList, date };
    QueryDataService.editQuery(username, id, query).then((response) => {
      console.log(response.data);
    });
  }

  render() {
    let { title, description, categoryList, category } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <HeaderComponent
          login={false}
          logout={true}
          register={false}
          logot={this.props.logot}
        />
        <div className="container">
          <main className={classes.main}>
            <Paper className={classes.paper} style={{ marginTop: "20px" }}>
              <Avatar className={classes.avatar}>
                <AddIcon />
              </Avatar>
              <Typography variant="h5">Edit Query</Typography>
              <ValidatorForm
                className={classes.form}
                style={{ marginTop: "5px" }}
                instantValidate={false}
                onSubmit={this.submitClicked}
              >
                <TextValidator
                  fullWidth
                  autoFocus
                  placeholder="Title"
                  name="title"
                  margin="normal"
                  value={title}
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
                  rows={4}
                  variant="filled"
                  value={description}
                  onChange={this.handleChange}
                  validators={["required", "isEnough"]}
                  errorMessages={[
                    "Enter a Title",
                    "Description must have 15 characters.",
                  ]}
                />
                <div
                  style={{
                    display: "flex",
                    padding: 0,
                    margin: 0,
                    marginTop: "30px",
                    height: "100px",
                  }}
                >
                  <TextValidator
                    margin="normal"
                    id="category"
                    style={{
                      width: "100%",
                      left: 0,
                      margin: "-20px",
                      marginTop: "40%",
                    }}
                    fullWidth
                    autoFocus
                    placeholder="Category"
                    name="category"
                    value={category}
                    onChange={this.handleChange}
                    validators={["isTag"]}
                    errorMessages={["Enter atleast one Category."]}
                  />
                  <Avatar
                    className={classes.avatar}
                    style={{ marginTop: "40px", backgroundColor: "#5eaaa8" }}
                  >
                    <AddIcon onClick={this.addLabel} />
                  </Avatar>
                  <div
                    style={{
                      width: "80%",
                      display: "flex",
                      flexDirection: "left",
                      flexWrap: "wrap",
                      border: "1px solid grey",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {categoryList.map((cat) => (
                      <Chip
                        key={uuidv4()}
                        id={cat}
                        style={{
                          margin: "2px",
                          backgroundColor: "#1C8EF9",
                          color: "white",
                        }}
                        label={cat}
                        onDelete={() => this.deleteTag(cat)}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  style={{
                    position: "relative",
                    marginBottom: "-110px",
                  }}
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
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default withStyles(styles)(EditQuery);
