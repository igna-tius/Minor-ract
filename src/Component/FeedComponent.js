import React, { Component } from "react";

import QueryDataService from "../api/QueryDataService.js";

import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent";
import AuthenticationService from "./AuthenticationService.js";

import Fab from "@material-ui/core/Fab";
import RefreshIcon from "@material-ui/icons/Refresh";

import QueryCard from "./QueryCard";
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
      <QueryCard query={m} editable={false} />
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
                  <Fab style={{ backgroundColor: "#5eaaa8" }} aria-label="add">
                    <RefreshIcon onClick={this.refreshQuery} />
                  </Fab>
                </div>
              </div>
              <div style={{ marginTop: "30px" }}>{querieslist}</div>
            </div>
          </div>
        )}

        <FooterComponent />
      </div>
    );
  }
}

export default FeedComponent;
