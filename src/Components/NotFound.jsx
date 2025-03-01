import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} className="text-center">
          <Image 
            src="/assets/images/notfound.jfif" 
            alt="404 Not Found" 
            fluid 
          />
          <h2 className="mt-3">Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound; 