import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Event from './Event';
import eventsData from '../data/events.json';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData.events);
  }, []);

  return (
    <Container>
      <Row>
        {events.map((event) => (
          <Event
            key={event.id}
            name={event.name}
            price={event.price}
            tickets={event.tickets}
            participants={event.participants}
            image={event.image}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Events;
