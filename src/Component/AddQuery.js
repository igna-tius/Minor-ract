import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../styles/AddQueryStyles";

import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";
import AddIcon from "@material-ui/icons/Add";
import FooterComponent from "./FooterComponent";

import TextField from "@material-ui/core/TextField";
import { FormGroup } from "@material-ui/core";

import Chip from "@material-ui/core/Chip";

import { v4 as uuidv4 } from "uuid";
import moment from "moment";

class AddQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: AuthenticationService.getLoggedInUsername(),
      id: "",
      category: "",
      categoryList: [],
      title: "",
      description: "",
      date: new Date(),
      allTag: "",
    };
    this.hanldeChange = this.hanldeChange.bind(this);
    this.registerClicked = this.registerClicked.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }
  makeTag() {
    const tag = this.setState({
      allTag: tag,
    });
  }
  deleteTag(label) {
    var tg = this.state.categoryList.filter((cat) => cat !== label);
    this.setState({
      categoryList: tg,
    });
  }
  addLabel(e) {
    e.preventDefault();
    var category = this.state.category;
    this.setState(
      {
        categoryList: [...this.state.categoryList, category],
        category: "",
      },
      this.handleCheck
    );
  }

  registerClicked(e) {
    e.preventDefault();
    const dt = new Date();
    this.setState({
      date: dt,
    });
    const { title, categoryList, username, date, description } = this.state;
    const msg =
      "Username: " +
      username +
      "\nTitle: " +
      title +
      "\nDescription: " +
      description +
      "\nCategories: " +
      categoryList +
      "\nDate: " +
      date;
    alert(msg);
    this.setState({
      id: "",
      categoryList: [],
      title: "",
      description: "",
      date: new Date(),
      category: "",
    });
  }
  hanldeChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div style={{ height: "100vh" }}>
        <HeaderComponent
          login={false}
          register={false}
          logout={true}
          logot={this.props.logot}
        />
        <main className={classes.main}>
          <Paper className={classes.paper} style={{ marginTop: "20px" }}>
            <Avatar className={classes.avatar}>
              <AddIcon />
            </Avatar>
            <Typography variant="h5">Add Query</Typography>
            <form className={classes.form} style={{ marginTop: "5px" }}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  id="title"
                  name="title"
                  autoFocus
                  value={this.state.title}
                  onChange={this.hanldeChange}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <TextField
                  id="standard-multiline-flexible"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  variant="filled"
                  value={this.state.description}
                  onChange={this.hanldeChange}
                />
              </FormControl>
              <div
                style={{
                  display: "flex",
                  padding: 0,
                  margin: 0,
                }}
              >
                <form
                  className={classes.form}
                  onSubmit={this.addLabel}
                  style={{
                    marginLeft: 0,
                    flexDirection: "left",
                    width: "30%",
                    padding: 0,
                  }}
                >
                  <FormControl
                    margin="normal"
                    required
                    width="40%"
                    style={{ marginLeft: "-90px" }}
                  >
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Input
                      id="category"
                      name="category"
                      autoFocus
                      value={this.state.category}
                      onChange={this.hanldeChange}
                    />
                  </FormControl>
                </form>
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "left",
                    flexWrap: "wrap",
                    border: "1px solid grey",
                    borderRadius: "5px",
                  }}
                >
                  {this.state.categoryList.map((cat) => (
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
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
                className={classes.submit}
                onClick={this.registerClicked}
              >
                Add
              </Button>
            </form>
          </Paper>
        </main>
        <FooterComponent />
      </div>
    );
  }
}

export default withStyles(styles)(AddQuery);
