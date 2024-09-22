import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import backImage from '../../../img/bodhgayas.jpg';
import bus from '../../../img/bus.png';
import NavbarComponent from '../NavbarComponent';
import 'react-datepicker/dist/react-datepicker.css';

const BusBookingHeader = ({ bookingInfo }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  useEffect(() => {
    console.log('BusBookingHeader useEffect, bookingInfo:', bookingInfo);
    if (bookingInfo) {
      setFromLocation(bookingInfo.from || '');
      setToLocation(bookingInfo.to || '');
    }
  }, [bookingInfo]);

  const handleNavbarToggle = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  console.log('BusBookingHeader rendered, fromLocation:', fromLocation, 'toLocation:', toLocation);

  return (
    <div style={{ padding: '20px' }}>
      {/* Banner Section */}
      <div className="banner" style={{
        position: 'relative',
        backgroundImage: `url(${backImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        color: 'white',
        textAlign: 'left',
        borderRadius: '20px',
        overflow: 'hidden',
        zIndex: 1 // Lower z-index
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>

        {/* Use NavbarComponent with onToggle */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <NavbarComponent onToggle={handleNavbarToggle} />
        </div>

        {/* Main Banner Text (conditionally rendered) */}
        {!isNavbarExpanded && (
          <Container className="d-flex flex-column justify-content-center align-items-start h-100" style={{
            position: 'relative',
            marginTop: '-180px'
          }}>
            <h1 className="fw-bold display-7 text-white" style={{ zIndex: '10' }}>
              Book your bus ride <br />
            </h1>
            <h1 style={{ zIndex: '10' }}><span className='fw-bold'>now</span>, we'll do the rest!</h1>
          </Container>
        )}
      </div>

      {/* Booking Form Section */}
      <Card id="booking-form" className="booking-form cardbotm" style={{
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 2 // Lower z-index, but still above the banner
      }}>
        <Card.Body style={{ position: 'relative' }} className='sect'>
          <h3 className="text-center mb-4">Book Your Journey</h3>
          <Form>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check inline label="One Way" name="journeyType" type="radio" id="one-way" defaultChecked />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check inline label="Round Trip" name="journeyType" type="radio" id="round-trip" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="fromLocation">
                  <Form.Label>From</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Patna" 
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={1} className="d-flex align-items-center justify-content-center">
                <span style={{ fontSize: '1.5rem', color: '#6f42c1' }}>⇆</span>
              </Col>
              <Col md={3}>
                <Form.Group controlId="toLocation">
                  <Form.Label>To</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Delhi" 
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="returnDate">
                  <Form.Label>Return</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check inline label="Single Lady" name="passengerType" type="radio" id="single-lady" />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check inline label="Senior Citizen" name="passengerType" type="radio" id="senior-citizen" />
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button variant="primary" size="lg" style={{ backgroundColor: '#86469C', border: 'none' }}>
                <i className="fas fa-bus"></i> Show Buses
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Bus Image */}
      <div className="busImage" style={{
        position: 'absolute',
        top: '67%',
        left: '70%',
        transform: 'translate(-50%, -100%)',
        zIndex: 3 // Above the booking form, but below the navbar
      }}>
        <img src={bus} alt='busImg' style={{ width: '100%', maxWidth: '900px' }} />
      </div>
    </div>
  );
};

export default BusBookingHeader;