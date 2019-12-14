import React, { useState } from "react";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/auth";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    register(username, email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={e => onChange(e)}
                name="username"
                type="input"
                placeholder="Enter Username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={e => onChange(e)}
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
                value={password}
                onChange={e => onChange(e)}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={password2}
                onChange={e => onChange(e)}
                name="password2"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button
              disabled={!(password === password2)}
              onClick={e => onSubmit(e)}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
            <Form.Text className="text-muted">
              Have an account? <Link to="/login">Log In!</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
