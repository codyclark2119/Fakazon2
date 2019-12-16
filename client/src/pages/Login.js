import React, { useState } from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md='8'>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={e => onChange(e)}
                name='email'
                type='input'
                placeholder='Enter email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={e => onChange(e)}
                name='password'
                type='password'
                placeholder='Password'
              />
            </Form.Group>

            <Button
              disabled={!(email && password)}
              onClick={e => onSubmit(e)}
              variant='primary'
              type='submit'
            >
              Submit
            </Button>
            <Form.Text className='text-muted'>
              Dont have an account? <Link to='/signup'>Sign Up!</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
