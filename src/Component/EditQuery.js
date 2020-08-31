import React, { Component } from "react";
import QueryDataService from "../api/QueryDataService";
import AuthenticationService from "./AuthenticationService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import HeaderComponent from "./HeaderComponent";

class EditQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      question: "Learn Forms",
      queryDate: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedInUsername();
    QueryDataService.retrieveQuery(username, this.state.id).then((response) =>
      this.setState({
        question: response.data.question,
      })
    );
  }

  onSubmit(values) {
    this.setState({
      queryDate: new Date(),
    });
    console.log(values);
  }

  validate(values) {
    let errors = {};
    if (!values.question) {
      errors.question = "Enter a Question";
    } else if (values.question.length < 15) {
      errors.question = "Should have atleast 15 characters in Question.";
    }

    return errors;
  }

  render() {
    let { question, queryDate } = this.state;

    return (
      <div>
        <HeaderComponent
          login={false}
          logout={true}
          register={false}
          logot={this.props.logot}
        />
        <br />
        <br />
        <h1>Query Editor</h1>
        <br />
        <br />
        <div className="container">
          <Formik
            initialValues={{ question, queryDate }}
            onSubmit={this.onSubmit}
            validate={this.validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="question"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Query</label>
                  <br />
                  <br />
                  <Field className="form-control" type="text" name="question" />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default EditQuery;
