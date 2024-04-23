import React, { useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Player,
  ControlBar,
  VolumeMenuButton,
  PlayToggle,
  BigPlayButton,
} from "video-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { listProductDetails } from "../Actions/productActions";
import Message from "../Components/Message";
import AddToListButton from "../Components/AddToListButton";
import RemoveToListButton from "../Components/RemoveToListButton";

function Productscreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isSubscriber) {
      navigate("/plans");
    }
  }

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <div style={{ paddingTop: '10px', maxWidth: '1280px', margin: 'auto' }}>
            <Player src={`http://127.0.0.1:8000${product.video}`} autoPlay={false} fluid={false} width={1280} height={720}>
              <ControlBar autoHide={true}>
                <PlayToggle />
                <VolumeMenuButton vertical />
              </ControlBar>
              <BigPlayButton position="center" />
            </Player>
          </div>
        </Col>
      </Row>
      <Row>
        <Col style={{ margin: '10px auto' }} md={{ span: 8, offset: 2 }}>
          <div style={{ padding: '20px', border: 'none' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{product.name}</h2>
            <hr style={{ border: 'none', borderBottom: '1px solid #ccc', marginBottom: '20px' }} />
            <div>
              <p>{product.description}</p>
              <hr style={{ border: 'none', borderBottom: '1px solid #ccc', marginBottom: '20px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>              <p>{product.genre}</p></div> {/* Empty div to align with description and genre */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AddToListButton productId={id} userId={userInfo._id} style={{ marginRight: '10px', padding: '5px' }} />
                <RemoveToListButton productId={id} userId={userInfo._id} variant="danger" style={{ padding: '5px' }} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Productscreen;
