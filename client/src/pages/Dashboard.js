import React from "react";
import { Col, Row, Container, Jumbotron } from "react-bootstrap";

function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Jumbotron>
            <h1>Your Profile</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
