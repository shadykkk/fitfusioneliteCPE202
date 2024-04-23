import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/productActions";
import { useNavigate } from "react-router-dom";

function MyListScreen() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!userInfo.isSubscriber) {
      navigate("/plans");
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userInfo, navigate]);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const productIds = userInfo ? userInfo.mylist : [];

  const baseUrl = "http://127.0.0.1:8000"; // Set the base URL here

  const mappedProducts = products
    .filter((product) => productIds.includes(product._id))
    .map((product) => ({
      ...product,
      image: product.image ? product.image : "", // Use the original image URL if available
    }));

  return (
    <div style={{ margin: "0 3%" }}>
      <br />
      <Container fluid>
        <div className="text-center" variant="light">
          <h1 className="display-4 fw-bold" style={{ color: "rgb(120, 194, 173)", paddingTop: '20px' }}>My Workout List</h1>
          <Form>
            <Row className="justify-content-center">
              <Col md={6}>
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="form-control-lg"
                />
              </Col>
            </Row>
          </Form>
          <br />
        </div>
        <Row xs={1} md={2} lg={3} className="g-4">
          {mappedProducts
            .filter((product) => {
              const query = search.toLowerCase();
              return (
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.genre.toLowerCase().includes(query)
              );
            })
            .map((product) => (
              <Col key={product._id}>
                {/* Pass baseUrl as a prop to Product component */}
                <Product product={product} baseUrl={baseUrl} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default MyListScreen;
