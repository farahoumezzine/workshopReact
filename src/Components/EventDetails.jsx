import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { getallEvents } from '../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getallEvents(id);
        setEvent(response.data);
      } catch (error) {
        setError("Event does not exist");
      }
    };
    fetchEvent();
  }, [id]);

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!event) {
    return <div>Loading...</div>;
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