import React from 'react';
import { Col, Row, Container, Jumbotron, Spinner } from 'react-bootstrap';
import Navbar from '../components/Navbar';
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
        <Navbar
          category={this.state.category}
          categorySearch={this.categorySearch}
          userSearch={this.userSearch}
          handleInputChange={this.handleInputChange}
          userQuery={this.state.userQuery}
        />
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
