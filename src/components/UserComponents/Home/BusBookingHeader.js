import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import busImage1 from '../../../asserts/images/2.png'; // First bus image
import busImage2 from '../../../asserts/images/1.png'; // Second bus image
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

        {/* NavbarComponent */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <NavbarComponent onToggle={handleNavbarToggle} />
        </div>

        {/* Main Banner Text */}
        {!isNavbarExpanded && (
          <Container className="d-flex flex-column justify-content-center align-items-start h-100" style={{
            position: 'relative',
            marginTop: '-180px'
          }}>
            <h1 className="fw-bold display-4 text-white" style={{ zIndex: '10', fontSize: '3rem' }}>
              {/* Removed the specified text */}
            </h1>
          </Container>
        )}

        {/* Logo and Text Container */}
        <div className="logo-text-container">
          {/* Logo */}
          <div className="logo">
            <img 
              src={logo} 
              alt='logo' 
              className="logo-image"
            />
          </div>

          {/* Text */}
          <div className="corporation-text">
            <div>बिहार राज्य पथ परिवहन निगम</div>
            <div>Bihar State Road Transport Corporation</div>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <Card id="booking-form" className="booking-form cardbotm" style={{
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 2
      }}>
        <Card.Body style={{ position: 'relative' }} className='sect'>
          <h3 className="text-center mb-4" style={{ fontSize: '36px', fontWeight: 'bold' }}>
            {language === 'en' ? 'Book Your Journey' : 'अपनी यात्रा बुक करें'}
          </h3>
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
                  <Form.Label style={{ fontSize: '18px' }}>{language === 'en' ? 'From' : 'से'}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={language === 'en' ? 'Patna' : 'पटना'} 
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    style={{ fontSize: '16px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={1} className="d-flex align-items-center justify-content-center">
                <span style={{ fontSize: '1.5rem', color: '#6f42c1' }}>⇆</span>
              </Col>
              <Col md={3}>
                <Form.Group controlId="toLocation">
                  <Form.Label style={{ fontSize: '18px' }}>{language === 'en' ? 'To' : 'तक'}</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder={language === 'en' ? 'Delhi' : 'दिल्ली'} 
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    style={{ fontSize: '16px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="departureDate">
                  <Form.Label style={{ fontSize: '18px' }}>{language === 'en' ? 'Departure' : 'प्रस्थान'}</Form.Label>
                  <Form.Control type="date" style={{ fontSize: '16px' }} />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="returnDate">
                  <Form.Label style={{ fontSize: '18px' }}>{language === 'en' ? 'Return' : 'वापसी'}</Form.Label>
                  <Form.Control type="date" style={{ fontSize: '16px' }} />
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
                <Button variant="primary" size="lg" style={{ backgroundColor: '#86469C', border: 'none', fontSize: '18px' }}>
                  <i className="fas fa-bus"></i> {language === 'en' ? 'Show Buses' : 'बसें दिखाएं'}
                </Button>
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Move Bus Images here - after the booking form */}
      <div className="bus-images-desktop" style={{
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        width: '95%',
        padding: '0 50px'
      }}>
        <img src={busImage1} alt='busImg1' className="bus-image" />
        <img src={busImage2} alt='busImg2' className="bus-image" />
      </div>

      {/* CSS for Responsive Design */}
      <style jsx>{`
        .logo-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          text-align: center;
          width: 100%;
          pointer-events: none;
        }

        .logo-image {
          width: 150px;
          height: auto;
          margin-bottom: 20px;
          pointer-events: none;
        }

        .corporation-text {
          color: white;
          font-size: 32px;
          font-weight: bold;
          pointer-events: none;
          line-height: 1.4;
        }

        .bus-image {
          width: 100%;
          max-width: 250px;
        }

        @media (max-width: 768px) {
          .bus-images-desktop {
            display: none !important;
          }

          .logo-text-container {
            top: 40%;
          }

          .logo-image {
            width: 200px;
            margin-bottom: 30px;
          }

          .corporation-text {
            font-size: 28px;
          }

          #booking-form {
            top: 70% !important;
            width: 90% !important;
          }
        }

        @media (max-width: 576px) {
          .logo-image {
            width: 180px;
            margin-bottom: 25px;
          }

          .corporation-text {
            font-size: 24px;
          }

          #booking-form {
            top: 75% !important;
            width: 95% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BusBookingHeader;
