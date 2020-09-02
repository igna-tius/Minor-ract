import React, { Component } from "react";

import QueryDataService from "../api/QueryDataService.js";

import moment from "moment";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent";
import AuthenticationService from "./AuthenticationService.js";

import Fab from "@material-ui/core/Fab";
import RefreshIcon from "@material-ui/icons/Refresh";

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      data: false,
    };
    this.refreshQuery = this.refreshQuery.bind(this);
    this.selectQuery = this.selectQuery.bind(this);
  }

  componentDidMount() {
    this.refreshQuery();
  }

  selectQuery(e) {
    this.props.history.push(`answerquery/${e.target.user}/${e.target.id}`);
    console.log(e.target.id, e.target.user);
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
        <td>{moment(m.date).format("YYYY-MM-DD")}</td>
        <td
          onClick={() =>
            this.props.history.push(`answerquery/${m.username}/${m.id}`)
          }
          id={m.id}
        >
          {m.title}
        </td>
        <td>{m.id}</td>
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
        <FooterComponent />
      </div>
    );
  }
}

export default FeedComponent;
