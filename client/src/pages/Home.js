import React from "react";

import {
  Col,
  Row,
  Container,
  Spinner,
  Button,
  FormControl,
  DropdownButton,
  InputGroup,
  Dropdown
} from "react-bootstrap";
import Product from "../components/Product";
import API from "../utils/API";

class Home extends React.Component {
  state = { products: [], userQuery: "", category: "" };
  componentDidMount() {
    API.getItems().then(res => {
      let products = [];
      let items = res.data;
      items.forEach(item => products.push(item));
      this.setState({ products: [...products] });
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
    API.itemSearch({ query: this.state.userQuery })
      .then(res => {
        let products = [];
        let items = res.data;
        items.forEach(item => products.push(item));
        this.setState({ products: [...products] });
      })

      .catch(err => console.log(err));

    this.setState({
      userQuery: ""
    });
  };

  render() {
    return (
      <Container>
        <Row className="mt-3 justify-content-md-center">
          <Col md="10">
            <InputGroup>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Categories"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item
                  name="category"
                  value="books"
                  onClick={event => this.categorySearch(event)}
                  as="button"
                  type="submit"
                >
                  Books
                </Dropdown.Item>
                <Dropdown.Item
                  name="category"
                  value="video games"
                  onClick={event => this.categorySearch(event)}
                  as="button"
                >
                  Video Games
                </Dropdown.Item>
                <Dropdown.Item
                  name="category"
                  value="electronics"
                  onClick={event => this.categorySearch(event)}
                  as="button"
                >
                  Electronics
                </Dropdown.Item>
                <Dropdown.Item
                  name="category"
                  value="clothes"
                  onClick={event => this.categorySearch(event)}
                  as="button"
                >
                  Clothes
                </Dropdown.Item>
              </DropdownButton>
              <FormControl
                name="userQuery"
                value={this.userQuery}
                onChange={this.handleInputChange}
                aria-describedby="basic-addon1"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.userSearch}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-md-center">
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
            <Spinner animation="border" variant="success" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}{" "}
        </Row>
      </Container>
    );
  }
}

export default Home;
