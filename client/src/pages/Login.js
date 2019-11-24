import React from "react";
import { Col, Row, Container, Jumbotron, Form, Button } from "react-bootstrap";
import API from "../utils/API";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    API.login({
      email: this.state.email,
      password: this.state.password
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <Jumbotron>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    type="input"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Button
                  disabled={!(this.state.email && this.state.password)}
                  onClick={this.handleFormSubmit}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Form.Text className="text-muted">
                  Dont have an account? <a href="/signup">Sign Up!</a>
                </Form.Text>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
