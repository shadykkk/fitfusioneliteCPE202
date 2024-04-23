import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listProducts, deleteProduct } from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";

const ProductListScreen = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const [setProducts] = useState([]);
  const { error, loading, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id)).then((response) => {
        navigate("/deleted");
      });
    }
  };

  if (!userInfo || !userInfo.isAdmin) {
    navigate("/login");
    return null;
  }

  const baseUrl = "http://127.0.0.1:8000"; // Set the base URL here

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold text-primary">Workout List</h1>
       
        <Form className="mb-4">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="form-control-lg"
          />
        </Form>
        <Link to="/addworkout" className="btn btn-primary btn-lg">
          Add Workout
        </Link>
      
      </div>
      <div className="table-responsive">
        <Table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Workout</th>
              <th scope="col">Poster</th>
              <th scope="col">Video</th>
              <th scope="col">Description</th>
              <th scope="col">Genre</th>
              <th scope="col">Publisher</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Message variant="danger">{error}</Message>
                </td>
              </tr>
            ) : (
              products
                .filter((product) =>
                  search.toLowerCase()
                    ? product.name.toLowerCase().includes(search) ||
                      product.description.toLowerCase().includes(search) ||
                      product.genre.includes(search)
                    : true
                )
                .map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={`${baseUrl}${product.image}`}
                        alt={product.name}
                        className="img-fluid"
                      />
                    </td>
                    <td>{product.video}</td>
                    <td>{product.description}</td>
                    <td>
                      {product.genre}
                    </td>
                    <td>{product.director}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </Button>
                      <LinkContainer to={`/editworkout/${product._id}`}>
                        <Button variant="light" className="ms-2">
                          Edit
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductListScreen;
