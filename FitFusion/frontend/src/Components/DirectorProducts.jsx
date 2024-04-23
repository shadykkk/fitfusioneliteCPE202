import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DirectorProducts({ product, baseUrl }) {
  // Truncate description to 50 characters
  const truncatedDescription = product.description.length > 50
    ? `${product.description.substring(0, 50)}...`
    : product.description;

  return (
    <Container>
      <Card className="rounded border-0 shadow" style={{ maxHeight: '300px', overflow: 'hidden' }}>
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Img
            src={`${baseUrl}${product.image}`}
            className="rounded-top"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
            }}
          />
        </Link>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title className="fw-bold text-center">{product.name}</Card.Title>
          <Card.Subtitle className="text-muted mb-2 text-center">Category: {product.genre}</Card.Subtitle>
          <Card.Subtitle className="text-muted mb-2 text-center">{truncatedDescription}</Card.Subtitle>
          <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Row className="justify-content-center">
            </Row>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DirectorProducts;
