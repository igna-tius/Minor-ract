import React, { Component } from "react";

import QueryDataService from "../api/QueryDataService.js";

import moment from "moment";
import HeaderComponent from "./HeaderComponent.js";
import AuthenticationService from "./AuthenticationService.js";

import { Link } from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      data: false,
    };
    this.refreshQuery = this.refreshQuery.bind(this);
  }

  componentDidMount() {
    this.refreshQuery();
  }
  refreshQuery() {
    QueryDataService.retriveAll()
      .then((response) => {
        this.setState({
          queries: response.data,
          data: true,
        });
      })
      .catch(this.setState({ data: false }));
  }

  render() {
    const querieslist = this.state.queries.map((m) => (
      <tr key={m.id}>
        <td>{moment(m.querytDate).format("YYYY-MM-DD")}</td>
        <td>{m.question}</td>
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
        {!this.state.data && (
          <div>
            <HeaderComponent
              register={!check}
              logout={check}
              login={!check}
              logot={this.props.logot}
            />
            <h1>No data received</h1>
          </div>
        )}
        {this.state.data && (
          <div>
            <HeaderComponent
              register={!check}
              logout={check}
              login={!check}
              logot={this.props.logot}
            />
            <div>
              <h2>Queries</h2>

              <div style={{ marginLeft: "75%" }}>
                <Fab style={{ backgroundColor: "#167bff" }} aria-label="add">
                  <RefreshIcon onClick={this.refreshQuery} />
                </Fab>
              </div>
            </div>
            <table className="table" style={{ marginTop: "30px" }}>
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
        )}
      </div>
    );
  }
}

export default FeedComponent;
