import React from "react";
import { Card } from "react-bootstrap";
import Fab from "@material-ui/core/Fab";



function FeedCard(props) {
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
                      
                  {props.id}
                    </span>{props.date}</Card.Text>
            </Card.Body>
        </Card>
    </div>
    
}
export default FeedCard;