import React from "react";
import {
  Card,
  Button,
  Row,
  Container,
  CardGroup,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Directors({ director }) {
  return (
    <Container>
      <Card className="rounded">
        <Link to={`/directorproducts/${director._id}`}>
          <Card.Img
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
            className="rounded"
            src={director.image}
          />
        </Link>
        <Card.Body>
          <Card.Title>
            <h3>
              {director.firstname} {director.lastname}
            </h3>
          </Card.Title>
          <br />
          {/* <Link to={`/genres/${genre._id}`}> */}
          <Row>
            <Button>
              <i class="fa fa-play" aria-hidden="true"></i> Movie Lists
            </Button>
          </Row>
          {/* </Link> */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Directors;
