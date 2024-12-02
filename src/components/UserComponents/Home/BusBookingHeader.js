import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import busImage1 from '../../../asserts/images/3.png'; // First bus image
import busImage2 from '../../../asserts/images/2.png'; // Second bus image
import logo from '../../../img/logo.png'; // Logo image
import NavbarComponent from '../NavbarComponent';
import 'react-datepicker/dist/react-datepicker.css';

const BusBookingHeader = ({ bookingInfo }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const language = localStorage.getItem('language') || 'en'; // Get the selected language

  useEffect(() => {
    if (bookingInfo) {
      setFromLocation(bookingInfo.from || '');
      setToLocation(bookingInfo.to || '');
    }
  }, [bookingInfo]);

  const handleNavbarToggle = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Banner Section */}
      <div className="banner" style={{
        position: 'relative',
        height: '90vh',
        color: 'white',
        textAlign: 'left',
        borderRadius: '20px',
        overflow: 'hidden',
        zIndex: 1,
        background: 'rgb(45,131,180)',
        background: 'radial-gradient(circle, rgba(101,196,221,1) 34%, rgba(31,155,225,1) 54%)'
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
              {/* Removed the specified text */}
            </h1>
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
        zIndex: 2
      }}>
        <Card.Body style={{ position: 'relative' }} className='sect'>
          <h3 className="text-center mb-4">{language === 'en' ? 'Book Your Journey' : 'अपनी यात्रा बुक करें'}</h3>
          <Form>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check inline label={language === 'en' ? 'One Way' : 'एक तरफा'} name="journeyType" type="radio" id="one-way" defaultChecked />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check inline label={language === 'en' ? 'Round Trip' : 'राउंड ट्रिप'} name="journeyType" type="radio" id="round-trip" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="fromLocation">
                  <Form.Label>{language === 'en' ? 'From' : 'से'}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={language === 'en' ? 'Patna' : 'पटना'} 
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
                  <Form.Label>{language === 'en' ? 'To' : 'तक'}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={language === 'en' ? 'Delhi' : 'दिल्ली'} 
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="departureDate">
                  <Form.Label>{language === 'en' ? 'Departure' : 'प्रस्थान'}</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="returnDate">
                  <Form.Label>{language === 'en' ? 'Return' : 'वापसी'}</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6} md={3}>
                <Form.Check inline label={language === 'en' ? 'Single Lady' : 'एकल महिला'} name="passengerType" type="radio" id="single-lady" />
              </Col>
              <Col xs={6} md={3}>
                <Form.Check inline label={language === 'en' ? 'Senior Citizen' : 'वरिष्ठ नागरिक'} name="passengerType" type="radio" id="senior-citizen" />
              </Col>
            </Row>
            <div className="text-center mt-4">
              <a href="https://bsrtc.co.in" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" style={{ backgroundColor: '#86469C', border: 'none' }}>
                  <i className="fas fa-bus"></i> {language === 'en' ? 'Show Buses' : 'बसें दिखाएं'}
                </Button>
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Logo Centered */}
      <div className="logo" style={{
        position: 'absolute',
        top: '38%', // Adjusted position to move the logo further up
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Adjust for centering
        zIndex: 4
      }}>
        <img src={logo} alt='logo' style={{ width: '200px', height: 'auto' }} /> {/* Adjust size as needed */}
      </div>

      {/* Text Below Logo */}
      <div className="text-center" style={{
        position: 'absolute',
        top: '60%', // Position below the logo
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 4,
        color: 'white', // Text color
        fontSize: '18px', // Text size
        fontWeight: 'bold'
      }}>
        <div>बिहार राज्य पथ परिवहन निगम</div>
        <div>Bihar State Road Transport Corporation</div>
      </div>

      {/* Bus Images */}
      <div className="busImages" style={{
        position: 'absolute',
        top: '67%',
        left: '50%',
        transform: 'translate(-50%, -100%)',
        zIndex: 3,
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%' // Adjust width to fit the layout
      }}>
        <img src={busImage1} alt='busImg1' style={{ width: '100%', maxWidth: '400px' }} />
        <img src={busImage2} alt='busImg2' style={{ width: '100%', maxWidth: '400px' }} />
      </div>

      {/* CSS for Responsive Design */}
      <style jsx>{`
        @media (max-width: 768px) {
          .busImages {
            display: none !important; // Force hide bus images on mobile
          }
          .logo {
            top: 10%; // Adjust logo position for mobile
          }
          .text-center {
            top: 45%; // Adjust text position for mobile
          }
        }
      `}</style>
    </div>
  );
};

export default BusBookingHeader; 