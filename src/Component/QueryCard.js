import React from "react";
import { Card } from "react-bootstrap";
import Fab from "@material-ui/core/Fab";



function QueryCard(props) {
    return <div>
        <Card     
        style={{
                textAlign: "left",
                width: "100%",
                marginBottom: "30px",
            }}>
            <Card.Header>
            <div
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    {props.title}
                    
                  </div>
            </Card.Header>
            
            <Card.Body>
            
                  <Card.Text><span style={{ float: "right" }}>
                      
                  <i class="fas fa-edit"></i> {props.username}
                    </span>{props.date}</Card.Text>
            </Card.Body>
        </Card>
    </div>
    
}
export default QueryCard;