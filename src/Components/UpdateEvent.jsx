import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getallEvents, editEvent } from '../services/api';
import { eventSchema } from '../schemas/eventSchema';
import { z } from 'zod';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    price: '',
    tickets: '',
    description: '',
    image: '',
    participants: 0,
    isLiked: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getallEvents(id);
        setEvent(response.data);
      } catch (error) {
        setError("Événement non trouvé");
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = eventSchema.parse({
        ...event,
        price: Number(event.price),
        tickets: Number(event.tickets)
      });
      await editEvent(id, validatedData);
      navigate('/events');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors.map(e => e.message).join(", "));
      } else {
        setError("Erreur lors de la modification de l'événement");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Modifier l'événement</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={event.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tickets disponibles</Form.Label>
          <Form.Control
            type="number"
            name="tickets"
            value={event.tickets}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL de l'image</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={event.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Event
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateEvent; 