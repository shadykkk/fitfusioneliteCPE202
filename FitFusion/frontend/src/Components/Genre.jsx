import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Genres({ genre, baseUrl }) {
  return (
    <Card className="border-0 rounded shadow">
      <Link to={`/genreproducts/${genre._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Append the base URL to the image URL */}
        <Card.Img
          src={`${baseUrl}${genre.image}`}
          className="rounded-top"
          style={{
            objectFit: 'cover',
            height: '200px', // Adjust as needed
          }}
        />
        <Card.Body className="text-center">
          <Card.Title className="fw-bold mb-0">{genre.name}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default Genres;
