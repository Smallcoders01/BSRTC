import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form, Card } from 'react-bootstrap';


const BusBookingHeader = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div className="banner" style={{
        position: 'relative',
        backgroundImage: 'url(/img/background/busb.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        color: 'white',
        textAlign: 'left',
        borderRadius: '20px',
        overflow: 'hidden'
      }}>
        {/* Overlay to reduce brightness only on the banner */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1
        }}></div>

        {/* Navbar Section */}
        <Navbar bg="transparent" variant="dark" expand="lg" style={{ border: 'none', position: 'relative', zIndex: 2 }}>
          <Container>
            <Navbar.Brand href="#home" className="fw-bold" style={{ fontSize: '2rem' }}>B.S.R.T.C</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto justify-content-center w-100">
                <Nav.Link href="#home" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>Home</Nav.Link>
                <Nav.Link href="#about" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>About Us</Nav.Link>
                <Nav.Link href="#contact" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>Contact Us</Nav.Link>
                <Nav.Link href="#gallery" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>Gallery</Nav.Link>
                <Nav.Link href="#directory" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>Directory</Nav.Link>
                <Nav.Link href="#tickets" style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif' }}>Tickets</Nav.Link>
              </Nav>
              <Button
                variant="secondary"
                style={{
                  color: 'gold',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent'
                }}
                className="ms-2"
              >
                Login
              </Button>

              <Button variant="primary" className="ms-2">Sign Up</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Banner Text */}
        <Container className="d-flex flex-column justify-content-center align-items-start h-100" style={{ marginTop: '-100px', position: 'relative', zIndex: 2 }}>
          <h1 className="fw-bold display-5 text-white">Book your bus ride <br /> <span className="text-primary">now</span>, we’ll do the rest!</h1>
        </Container>
      </div>

      {/* Booking Form */}
      <Card className="booking-form" style={{
        position: 'absolute', // Changed to absolute to separate from the banner
        top: '65%', // Positioned to partially overlap the banner
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 3 // Higher than the banner overlay
      }}>
        <Card.Body>
          <h3 className="text-center mb-4">Book Your Journey</h3>
          <Form>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check
                  inline
                  label="One Way"
                  name="journeyType"
                  type="radio"
                  id="one-way"
                  defaultChecked
                />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check
                  inline
                  label="Round Trip"
                  name="journeyType"
                  type="radio"
                  id="round-trip"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="fromLocation">
                  <Form.Label>From</Form.Label>
                  <Form.Control type="text" placeholder="Patna" />
                </Form.Group>
              </Col>

              <Col md={1} className="d-flex align-items-center justify-content-center">
                <span style={{ fontSize: '1.5rem', color: '#6f42c1' }}>⇆</span>
              </Col>

              <Col md={3}>
                <Form.Group controlId="toLocation">
                  <Form.Label>To</Form.Label>
                  <Form.Control type="text" placeholder="Delhi" />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure</Form.Label>
                  <Form.Control type="text" placeholder="05 Nov 24" />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group controlId="returnDate">
                  <Form.Label>Return</Form.Label>
                  <Form.Control type="text" placeholder="05 Nov 24" disabled />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check
                  inline
                  label="Single Lady"
                  name="passengerType"
                  type="radio"
                  id="single-lady"
                />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check
                  inline
                  label="Senior Citizen"
                  name="passengerType"
                  type="radio"
                  id="senior-citizen"
                />
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button variant="primary" size="lg">
                <i className="fas fa-bus"></i> Show Buses
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BusBookingHeader;
