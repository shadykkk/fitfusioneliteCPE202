import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Product from '../Components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom'; // import useNavigate


function HomeScreen() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialize useNavigate
  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector(state => state.productList);
  const { error, loading, products } = productList;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      scroll.scrollTo(section.offsetTop - 3, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  };

  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate('/login');
  } else {
    if (!userInfo.isSubscriber) {
      navigate('/plans');
    }
  }

  return (
    <div>
      <section style={{ 
        backgroundImage: 'url("https://i0.wp.com/minimalistboy.com/wp-content/uploads/2018/03/calisthenics.jpg")',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '800px', padding: '0 20px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: '#fff' }}>FitFUSION ELITE</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '40px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', color: '#fff' }}>Do you want to fulfill your goals at the comfort of your home?</p>
          <Button onClick={() => scrollToSection('home-workouts')} className="btn btn-primary btn-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Get Started</Button>
        </div>
      </section>

      <Container fluid className="py-5">
        <div className="text-center mb-4" id="home-workouts">
        <h1 className="display-4 fw-bold text-primary" style={{ paddingTop: '20px' }}>Home Workouts</h1>
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
          <Row xs={1} md={2} lg={3} className="g-4">
            {products.filter((product) => {
              return search.toLowerCase() === '' ?
                product : product.name.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search);
            }).map(product => (
              <Col key={product._id}>
                <Product product={product} baseUrl='http://127.0.0.1:8000' />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default HomeScreen;
