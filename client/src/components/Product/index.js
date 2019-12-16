import React, { useState } from 'react';
import { Col, Card, Button, Modal } from 'react-bootstrap';

export default function Product(props) {
  const [show, setShow] = useState(false);
  return (
    <Col className='mb-3' lg={5} key={props.id}>
      <Card>
        <Card.Body>
          <Card.Title>
            {props.name} for ${props.price}
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            Sold by {props.seller}
          </Card.Subtitle>
          <Button variant='primary' onClick={() => setShow(true)}>
            See More
          </Button>{' '}
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title id='example-custom-modal-styling-title'>
                {props.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sold by {props.seller} for ${props.price} <br />
              {props.description}
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </Col>
  );
}
