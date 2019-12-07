import React from "react";
import { Col, Card } from "react-bootstrap";

export default function Product(props) {
  return (
    <Col className="mb-3" lg={10} key={props.id}>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.name} for ${props.price}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Sold by {props.seller}
          </Card.Subtitle>
          <Card.Text>{props.description}</Card.Text>
          <Card.Link href={"http://localhost:5000/api/items/" + props.id}>
            Card Link
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
