import React, { Component } from "react";
import { Card } from "react-bootstrap";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";

class QueryCard extends Component {
  constructor(props) {
    super(props);
    this.editQuery = this.editQuery.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
  }

  editQuery(e) {
    e.stopPropagation();
    this.props.editQuery(this.props.query.id);
  }

  deleteQuery(e) {
    e.stopPropagation();
    this.props.deleteQuery(this.props.query.id);
  }
  render() {
    const { query } = this.props;
    return (
      <div>
        <Card
          style={{
            textAlign: "left",
            width: "100%",
            marginBottom: "30px",
          }}
          id={query.id}
          onClick={() => this.props.selectQuery(query.username, query.id)}
        >
          <Card.Header>
            <div
              style={{
                justifyContent: "space-between",
              }}
            >
              {query.title}
              <span style={{ float: "right" }}>
                <AccountCircleIcon />
                {query.username}
              </span>
            </div>
          </Card.Header>

          <Card.Body>
            <Card.Text>
              {moment(query.date).format("DD-MM-YYYY")}
              {this.props.editable && (
                <span style={{ float: "right" }}>
                  <EditIconOutlined onClick={this.editQuery} />{" "}
                  <DeleteIcon onClick={this.deleteQuery} />
                </span>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default QueryCard;
