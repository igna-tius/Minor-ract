import React from "react";
import { Card } from "react-bootstrap";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditIconOutlined from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";

function QueryCard(props) {
  const { query } = props;
  return (
    <div>
      <Card
        style={{
          textAlign: "left",
          width: "100%",
          marginBottom: "30px",
        }}
        id={query.id}
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
            {props.editable && (
              <span style={{ float: "right" }}>
                <EditIconOutlined onClick={() => props.editQuery(query.id)} />{" "}
                <DeleteIcon onClick={() => props.deleteQuery(query.id)} />
              </span>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default QueryCard;
