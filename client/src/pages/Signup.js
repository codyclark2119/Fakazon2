import React from "react";
import { Col, Row, Container, Jumbotron, Form, Button } from "react-bootstrap";
import API from "../utils/API";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.password &&
      this.state.password2 &&
      this.state.username &&
      this.state.email
    ) {
      if (this.state.password === this.state.password2) {
        API.signUp({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8">
            <Jumbotron>
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                    type="input"
                    placeholder="Enter Username"
                  />
                </Form.Group>
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
                <Form.Group controlId="formBasicPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={this.state.password2}
                    onChange={this.handleInputChange}
                    name="password2"
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
                  Have an account? <a href="/login">Log In!</a>
                </Form.Text>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;
