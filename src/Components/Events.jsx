import React, { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import Event from './Event';
import { getallEvents, deleteEvent } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Composant Events monté");
    fetchEvents();
    setShowWelcome(true);
    
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => {
      console.log("Composant Events démonté");
      clearTimeout(timer);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getallEvents();
      setEvents(response.data);
    } catch (error) {
      setError("Erreur lors du chargement des événements");
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("État des événements mis à jour:", events);
  }, [events]);

  const handleBooking = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId && event.tickets > 0) {
        return {
          ...event,
          tickets: event.tickets - 1,
          participants: event.participants + 1
        };
      }
      return event;
    }));
  };

  const handleLike = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          isLiked: !event.isLiked
        };
      }
      return event;
    }));
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      setError("Erreur lors de la suppression de l'événement");
      console.error(error);
    }
  };

  return (
    <Container>
      {showWelcome && (
        <Alert variant="success" className="mt-3">
          Bienvenue à nos événements !
        </Alert>
      )}
      <Row>
        {events.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            name={event.name}
            price={event.price}
            tickets={event.tickets}
            participants={event.participants}
            image={event.image}
            isLiked={event.isLiked}
            onBook={handleBooking}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Events;
