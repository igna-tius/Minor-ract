import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class SingleQueryComponent extends Component {
  render() {
    return (
      <div>
        <HeaderComponent
          login={false}
          register={false}
          logout={true}
          logot={this.props.logout}
        />
        <div height="200px" style={{ backgroundColor: "red" }}>
          {this.props.match.params.id}
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default SingleQueryComponent;
