import React, { useState, useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import Event from './Event';
import eventsData from '../data/events.json';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    console.log("Composant Events monté");
    setEvents(eventsData.events);
    
    // Afficher le message de bienvenue après le montage
    setShowWelcome(true);
    
    // Masquer le message après 3 secondes
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => {
      console.log("Composant Events démonté");
      clearTimeout(timer);
    };
  }, []);

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
          />
        ))}
      </Row>
    </Container>
  );
};

export default Events;
