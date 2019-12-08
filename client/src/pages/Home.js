import React from 'react';
import {
  Col,
  Row,
  Container,
  Jumbotron,
  Spinner,
  Button,
  FormControl,
  DropdownButton,
  InputGroup,
  Dropdown
} from 'react-bootstrap';
import Product from '../components/Product';
import API from '../utils/API';

class Home extends React.Component {
  state = { products: [], userQuery: '', category: '' };
  componentDidMount() {
    API.getItems().then(res => {
      let products = [];
      console.log(res.data);
      let items = res.data;
      items.forEach(item => products.push(item));
      this.setState({ products: [...products] });
      console.log(this.state.products);
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  categorySearch = event => {
    event.preventDefault();
    console.log(event.target.value);
    API.categorySearch({ query: event.target.value })
      .then(res => {
        let products = [];
        let items = res.data;
        items.forEach(item => products.push(item));
        this.setState({ products: [...products] });
      })

      .catch(err => console.log(err));
  };

  userSearch = () => {
    console.log(this.state.userQuery);
    API.itemSearch({ query: this.state.userQuery })
      .then(res => {
        let products = [];
        let items = res.data;
        items.forEach(item => products.push(item));
        this.setState({ products: [...products] });
      })

      .catch(err => console.log(err));

    this.setState({
      userQuery: ''
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
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
                onClick={event => this.categorySearch(event)}
                as='button'
                type='submit'
              >
                Books
              </Dropdown.Item>
              <Dropdown.Item
                name='category'
                value='video games'
                onClick={event => this.categorySearch(event)}
                as='button'
              >
                Video Games
              </Dropdown.Item>
              <Dropdown.Item
                name='category'
                value='electronics'
                onClick={event => this.categorySearch(event)}
                as='button'
              >
                Electronics
              </Dropdown.Item>
              <Dropdown.Item
                name='category'
                value='clothes'
                onClick={event => this.categorySearch(event)}
                as='button'
              >
                Clothes
              </Dropdown.Item>
            </DropdownButton>
            <FormControl
              name='userQuery'
              value={this.userQuery}
              onChange={this.handleInputChange}
              aria-describedby='basic-addon1'
            />
            <InputGroup.Append>
              <Button variant='outline-secondary' onClick={this.userSearch}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row>
          <Col md='12'>
            <Jumbotron>
              <Row className='justify-content-md-center'>
                {this.state.products.length ? (
                  this.state.products.map(product => (
                    <Product
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      seller={product.seller}
                      description={product.description}
                    />
                  ))
                ) : (
                  <Jumbotron>
                    <Spinner animation='border' variant='success' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </Spinner>
                  </Jumbotron>
                )}{' '}
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
