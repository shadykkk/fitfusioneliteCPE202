import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { login } from '../Actions/accountActions';
import FormContainer from '../Components/FormContainer';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '2', position: 'relative' }}>
        <img
          src="https://i0.wp.com/minimalistboy.com/wp-content/uploads/2018/03/calisthenics.jpg"
          alt="Calisthenics"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'linear-gradient(110deg, rgba(0,0,0,0) 69%, rgba(255,255,255,1) 70%)'
          }}
        ></div>
      </div>
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
        <FormContainer>
          <div className="text-center">
            <h1 style={{ fontWeight: 'bold', color: 'rgb(120, 194, 173)' }}>Sign In</h1>
          </div>
          <br />
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>
          <Row className='py-2'>
            <Col>
              Not Registered?{' '}
              <Link to='/signup' style={{ fontWeight: 'bold', color: 'rgb(120, 194, 173)' }}>
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </div>
  );
}

export default LoginScreen;
