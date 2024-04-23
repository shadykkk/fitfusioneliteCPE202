import React, { useEffect, useState } from "react";
import { Container, Row, Col} from "react-bootstrap";
import Director from "../Components/Director";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import products from '../products'
import { useDispatch, useSelector } from "react-redux";
import { listDirectors } from "../Actions/directorActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

function DirectorsScreen() {
  // const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const directorList = useSelector((state) => state.directorList);
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate('/login');
  } else {
    if (!userInfo.isSubscriber) {
      navigate('/plans')
    }
  }
  const { error, loading, directors } = directorList;
  useEffect(() => {
    dispatch(listDirectors());
  }, []);
  // const products = []
  return (
    <div>
      <br />
      <Container fluid>
        <div class="text-center" variant="light">
          <h1>Directors</h1>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {directors.map((director) => (
              <Col
                className="row g-1"
                key={director._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
                <Director director={director} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default DirectorsScreen;
