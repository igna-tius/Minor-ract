import React, { Component } from "react";
import QueryDataService from "../api/QueryDataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from "moment";
import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

class QueriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      message: "",
    };
    this.deleteQueryClicked = this.deleteQueryClicked.bind(this);
    this.updateQueryClicked = this.updateQueryClicked.bind(this);
    this.refreshQuery = this.refreshQuery.bind(this);
    this.selectQuery = this.selectQuery.bind(this);
  }

  componentDidMount() {
    this.refreshQuery();
  }

  selectQuery(e) {
    this.props.history.push(`/singlequery/${e.target.id}`);
    console.log(e.target.id);
  }

  deleteQueryClicked(id) {
    let username = AuthenticationService.getLoggedInUsername();
    QueryDataService.deleteQuery(username, id).then((response) => {
      this.setState({ message: `Delete of Query ${id} Successful` });
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
      <tr key={m.id} id={m.id}>
        <td>{moment(m.querytDate).format("YYYY-MM-DD")}</td>
        <td onClick={this.selectQuery} id={m.id}>
          {m.title}
        </td>
        <td>{m.id}</td>
        <td>
          <i
            className="fas fa-trash-alt"
            onClick={() => this.deleteQueryClicked(m.id)}
          >
            delete
          </i>
        </td>
        <td>
          <i
            className="fas fa-edit"
            onClick={() => this.updateQueryClicked(m.id)}
          ></i>
        </td>
      </tr>
    ));

    const check = AuthenticationService.isUserLoggedIn();
    return (
      <div>
        <HeaderComponent
          register={!check}
          logout={check}
          login={!check}
          logot={this.props.logot}
        />
        <br />
        <div>
          <h2>Queries</h2>
        </div>
        <div style={{ marginLeft: "75%" }}>
          <Link to="/addquery">
            <Fab style={{ backgroundColor: "#167bff" }} aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
        <br />
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}
        <br />
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Query</th>
                <th>Query id</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{querieslist}</tbody>
          </table>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default QueriesComponent;
