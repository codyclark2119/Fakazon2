import React, { useState } from 'react';
import { Col, Form, Button, Modal, Row, Container, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
// import { login } from '../actions/auth';

const Checkout = ({ isAuthenticated }) => {
  const [show, setShow] = useState(false);

  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [cardnumber, setCardnum] = useState('');
  const [cardexp, setCardexp] = useState('');
  const [cardccv, setCardccv] = useState('');
  const [cardstreet, setCardst] = useState('');
  const [cardapt, setCardapt] = useState('');
  const [cardcity, setCardcity] = useState('');
  const [cardstate, setCardstate] = useState('');
  const [cardzip, setCardzip] = useState('');

  const onSubmit = async e => {
    e.preventDefault();

    const newProfile = {};
    newProfile.address = {
      street,
      apt,
      city,
      state,
      zip
    };
    newProfile.payment = {
      cardnumber,
      cardexp,
      cardccv
    };
    newProfile.payment.cardaddress = {
      cardstreet,
      cardapt,
      cardcity,
      cardstate,
      cardzip
    };
    // login(newProfile);
    console.log(newProfile);
  };
  return (
    <Nav.Item>
      <Nav.Link onClick={() => setShow(true)}>Checkout</Nav.Link>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          Enter shipping and payment information
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Row>
                <Col md='12' lg='6'>
                  <h1>Enter your address</h1>
                  <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      name='street'
                      type='input'
                      placeholder='Enter Street Address'
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apt #</Form.Label>
                    <Form.Control
                      value={apt}
                      onChange={e => setApt(e.target.value)}
                      name='apt'
                      type='input'
                      placeholder='Enter Apt Number or Other'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      name='city'
                      type='input'
                      placeholder='Enter City'
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      value={state}
                      onChange={e => setState(e.target.value)}
                      name='state'
                      type='input'
                      placeholder='Enter State'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      name='zip'
                      type='input'
                      placeholder='Enter Zip Code'
                    ></Form.Control>
                  </Form.Group>{' '}
                </Col>
                <Col md='12' lg='6'>
                  <h1>Enter your Card Information</h1>
                  <Form.Group>
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      value={cardnumber}
                      onChange={e => setCardnum(e.target.value)}
                      name='cardnumber'
                      type='input'
                      placeholder='Enter Card Number'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group>
                    <Form.Label>Card Expiration</Form.Label>
                    <Form.Control
                      value={cardexp}
                      onChange={e => setCardexp(e.target.value)}
                      name='cardexp'
                      type='input'
                      placeholder='Enter Card Expiration'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group>
                    <Form.Label>Card CCV</Form.Label>
                    <Form.Control
                      value={cardccv}
                      onChange={e => setCardccv(e.target.value)}
                      name='cardccv'
                      type='input'
                      placeholder='Enter Card CCV'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <h1>Enter Billing Address</h1>
                  <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      value={cardstreet}
                      onChange={e => setCardst(e.target.value)}
                      name='cardstreet'
                      type='input'
                      placeholder='Enter Street Address'
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Apt #</Form.Label>
                    <Form.Control
                      value={cardapt}
                      onChange={e => setCardapt(e.target.value)}
                      name='cardapt'
                      type='input'
                      placeholder='Enter Apt Number or Other'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={cardcity}
                      onChange={e => setCardcity(e.target.value)}
                      name='cardcity'
                      type='input'
                      placeholder='Enter City'
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      value={cardstate}
                      onChange={e => setCardstate(e.target.value)}
                      name='cardstate'
                      type='input'
                      placeholder='Enter State'
                    ></Form.Control>
                  </Form.Group>{' '}
                  <Form.Group>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      value={cardzip}
                      onChange={e => setCardzip(e.target.value)}
                      name='cardzip'
                      type='input'
                      placeholder='Enter Zip Code'
                    ></Form.Control>
                  </Form.Group>{' '}
                </Col>
              </Row>
              <Button
                disabled={!(cardnumber && cardstreet)}
                onClick={e => onSubmit(e)}
                variant='primary'
                type='submit'
              >
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </Nav.Item>
  );
};

Checkout.propTypes = {
  //   login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Checkout);
