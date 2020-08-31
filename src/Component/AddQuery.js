import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";

class AddQuery extends Component {
  render() {
    return (
      <div>
        <HeaderComponent
          login={false}
          register={false}
          logout={true}
          logot={this.props.logot}
        />
        <h4>Enter details of query</h4>
      </div>
    );
  }
}

export default AddQuery;
