import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import busbImage from '../../../img/bodhgayas.avif';
import bus from '../../../img/bus.png';
import NavbarComponent from '../NavbarComponent'; // Import NavbarComponent
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BusBookingHeader = () => {
  return (
    <div style={{ padding: '20px' }}>
      {/* Banner Section */}
      <div className="banner" style={{
        position: 'relative',
        backgroundImage: `url(${busbImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        color: 'white',
        textAlign: 'left',
        borderRadius: '20px',
        overflow: 'hidden'
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

        {/* Use NavbarComponent */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <NavbarComponent />
        </div>

        {/* Main Banner Text */}
        <Container className="d-flex flex-column justify-content-center align-items-start h-100" style={{
          position: 'relative',
          // zIndex: 1,
          marginTop: '-180px'
        }}>
          <h1 className="fw-bold display-7 text-white" style={{ zIndex: '10' }}>
            Book your bus ride <br />
          </h1>
          <h1 style={{ zIndex: '10' }}><span className='fw-bold'>now</span >, we’ll do the rest!</h1>
          <div className='busImage'>
            <img src={bus} alt='busImg' />
          </div>
        </Container>
      </div>

      {/* Booking Form Section */}
      <Card className="booking-form" style={{
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 3
      }}>
        <Card.Body>
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
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="returnDate">
                  <Form.Label>Return</Form.Label>
                  <Form.Control type="date"  />
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
    </div>
  );
};

export default BusBookingHeader;
