import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Event = ({ name, price, tickets, participants, image }) => {
  // Use the passed image prop, fallback to placeholder if image is not available
  const imageUrl = image || "https://via.placeholder.com/300x200";

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100">
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body className="p-3">
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Prix: {price}€
            <br />
            Tickets disponibles: {tickets}
            <br />
            Participants: {participants}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;
