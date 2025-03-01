import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Events Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/"
              className={({ isActive }) => isActive ? "active text-decoration-underline" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/events"
              className={({ isActive }) => isActive ? "active text-decoration-underline" : ""}
            >
              Events
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/events/add"
              className={({ isActive }) => isActive ? "active text-decoration-underline" : ""}
            >
              Add Event
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 