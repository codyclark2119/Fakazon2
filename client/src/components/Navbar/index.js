import React, { Fragment } from 'react';
import {
  Navbar,
  Nav,
  Button,
  FormControl,
  DropdownButton,
  Container,
  InputGroup,
  Dropdown
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = (props, { auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>Shop</Nav.Link>
        <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
        <Nav.Link onClick={logout} href='#'>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );

  const guestLinks = (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/signup'>Signup</Nav.Link>
        <Nav.Link href='/login'>Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  );
  return (
    <Navbar fixed='top' expand='md' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Fakazon</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <InputGroup>
          <DropdownButton
            as={InputGroup.Prepend}
            variant='outline-secondary'
            title='Categories'
            id='input-group-dropdown-1'
          >
            <Dropdown.Item
              name='category'
              value='books'
              onClick={event => props.categorySearch(event)}
              as='button'
              type='submit'
            >
              Books
            </Dropdown.Item>
            <Dropdown.Item
              name='category'
              value='video games'
              onClick={event => props.categorySearch(event)}
              as='button'
            >
              Video Games
            </Dropdown.Item>
            <Dropdown.Item
              name='category'
              value='electronics'
              onClick={event => props.categorySearch(event)}
              as='button'
            >
              Electronics
            </Dropdown.Item>
            <Dropdown.Item
              name='category'
              value='clothes'
              onClick={event => props.categorySearch(event)}
              as='button'
            >
              Clothes
            </Dropdown.Item>
          </DropdownButton>
          <FormControl
            name='userQuery'
            value={props.userQuery}
            onChange={props.handleInputChange}
            aria-describedby='basic-addon1'
          />
          <InputGroup.Append>
            <Button variant='outline-secondary' onClick={props.userSearch}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
