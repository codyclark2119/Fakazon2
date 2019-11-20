import React from "react";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";

function Home() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Jumbotron>
            <h1>Home Page </h1>
            <h1>Contents</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
