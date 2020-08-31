import React, { Component } from "react";

import QueryDataService from "../api/QueryDataService.js";

import moment from "moment";

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
    };
    this.refreshQuery = this.refreshQuery.bind(this);
  }

  refreshQuery() {
    QueryDataService.retriveAll().then((response) => {
      this.setState({
        queries: response.data,
      });
    });
  }

  render() {
    this.refreshQuery();
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

    return (
      <div>
        <button onClick={this.refreshQuery}>Refresh</button>
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
    );
  }
}

export default FeedComponent;
