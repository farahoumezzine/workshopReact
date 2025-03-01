import React, { useState } from 'react';
import { Card, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Event = ({ id, name, price, tickets, participants, image, isLiked, onBook, onLike }) => {
  const [isBooked, setIsBooked] = useState(false);
  const [showBookingMessage, setShowBookingMessage] = useState(false);
  const navigate = useNavigate();

  const handleBooking = () => {
    if (tickets > 0 && !isBooked) {
      onBook(id);
      setIsBooked(true);
      setShowBookingMessage(true);
      
      // Masquer le message après 2 secondes
      setTimeout(() => {
        setShowBookingMessage(false);
      }, 2000);
    }
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100">
        <Card.Img variant="top" src={image} />
        <Card.Body className="p-3">
          <Card.Title 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/events/${encodeURIComponent(name)}`)}
          >
            {name}
          </Card.Title>
          <Card.Text>
            Prix: {price}€
            <br />
            {tickets === 0 ? (
              <span className="text-danger">Sold Out</span>
            ) : (
              <>Tickets disponibles: {tickets}</>
            )}
            <br />
            Participants: {participants}
            <br />
          </Card.Text>
          
          {showBookingMessage && (
            <Alert variant="success" className="mb-2">
              You have booked an event
            </Alert>
          )}

          <div className="d-flex justify-content-between">
            <Button 
              onClick={handleBooking}
              disabled={tickets === 0}
              variant={tickets === 0 ? "secondary" : "primary"}
            >
              {tickets === 0 ? "Sold Out" : "Book an event"}
            </Button>

            <Button
              onClick={() => onLike(id)}
              variant={isLiked ? "danger" : "outline-danger"}
            >
              {isLiked ? "Dislike" : "Like"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;
