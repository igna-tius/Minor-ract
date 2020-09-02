import React, { Component } from "react";
import { Card } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";

class SolutionComponent extends Component {
  render() {
    const { solution } = this.props;
    return (
      <Card style={{ textAlign: "left", width: "100%", marginTop: "20px" }}>
        <Card.Header>
          <div
            style={{
              justifyContent: "space-between",
            }}
          >
            {solution.title}
            <span style={{ float: "right" }}>
              <EditIcon />
              {solution.username}
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{solution.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default SolutionComponent;
