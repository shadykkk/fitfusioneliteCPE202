import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Genres from '../Components/Genre';
import { useDispatch, useSelector } from 'react-redux';
import { listGenres } from '../Actions/genreActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useNavigate } from 'react-router-dom';

function GenreScreen() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const genreList = useSelector(state => state.genreList);
  const userLogin = useSelector(state => state.userLogin);
  const navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate('/login');
  } else {
    if (!userInfo.isSubscriber) {
      navigate('/plans');
    }
  }

  const { error, loading, genres } = genreList;

  useEffect(() => {
    dispatch(listGenres());
  }, [dispatch]);

  // Define the base URL for the images
  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div>
      <Container fluid className="py-5">
        <div className="text-center mb-4" id="genre-section">
          <h1 className="display-4 fw-bold text-primary" style={{ paddingTop: '20px' }}>Categories</h1>
          <Form className="mb-4">
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
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row className="justify-content-center">
            {genres
              .filter((genre) =>
                search.toLowerCase() === ''
                  ? genre
                  : genre.name.toLowerCase().includes(search)
              )
              .map((genre) => (
                <Col key={genre._id} className="d-flex justify-content-center">
                  {/* Set the width of the Genres container */}
                  <div style={{ width: '550px' }}>
                    <Genres genre={genre} baseUrl={baseUrl} />
                  </div>
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default GenreScreen;
