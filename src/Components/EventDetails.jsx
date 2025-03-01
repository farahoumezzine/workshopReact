import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import eventsData from '../data/events.json';

const EventDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  
  const event = eventsData.events.find(
    e => e.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
  );

  if (!event) {
    return navigate('/not-found');
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={event.image} />
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Text>
            Prix: {event.price}€
            <br />
            Tickets disponibles: {event.tickets}
            <br />
            Participants: {event.participants}
          </Card.Text>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EventDetails; 