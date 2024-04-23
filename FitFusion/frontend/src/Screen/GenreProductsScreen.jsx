import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import DirectorProducts from '../Components/DirectorProducts';
import { listGenreMovies } from '../Actions/genreActions';

function GenreProductsScreen() {
  const [search, setSearch] = useState('');
  const { id } = useParams();
  const [genreProducts, setGenreProducts] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { userInfo } = userLogin;
  const genreMovies = useSelector((state) => state.genreMovies);
  const { genreproducts1 } = genreMovies;

  if (!userInfo) {
    navigate('/login');
  } else {
    if (!userInfo.isSubscriber) {
      navigate('/plans');
    }
  }

  useEffect(() => {
    async function fetchGenreProducts() {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/genreproducts/${id}`);
      setGenreProducts(data);
    }
    fetchGenreProducts();
  }, []);

  // Define the base URL for images
  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-primary">Home Workouts</h1>
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
        </div>
        <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
          {genreProducts
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
                {/* Pass baseUrl as a prop to DirectorProducts */}
                <DirectorProducts product={product} baseUrl={baseUrl} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default GenreProductsScreen;
