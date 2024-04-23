import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Product({ product, baseUrl }) {
  const mediaUrl = `${baseUrl}${product.image}`;

  return (
    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="rounded border-0 shadow" style={{ width: '500px', margin: '0 0 0 40px', cursor: 'pointer' }}>
        <Card.Img
          className="rounded-top"
          src={mediaUrl}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />
        <Card.Body className="p-3">
          <Card.Title className="m-0">
            <h5>{product.name}</h5>
          </Card.Title>
          <Card.Text className="text-muted mb-2">
            Category: {product.genre}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default Product;
