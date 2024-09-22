import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import backImage from '../../../img/bodhgayas.jpg';
import bus from '../../../img/bus.png';
import NavbarComponent from '../NavbarComponent';
import 'react-datepicker/dist/react-datepicker.css';

const BusBookingHeader = () => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [formData, setFormData] = useState({
    journeyType: 'one-way',
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    returnDate: '',
    passengerType: ''
  });

  const handleNavbarToggle = (expanded) => {
    setIsNavbarExpanded(expanded);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('${config.apiBaseUrl}/bookings', formData)
      .then(response => {
        alert('Booking successful!');
      })
      .catch(error => {
        alert('Booking failed!');
      });
  };

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
            <h1 style={{ zIndex: '10' }}><span className='fw-bold'>now</span>, we’ll do the rest!</h1>
          </Container>
        )}
      </div>

      {/* Booking Form Section */}
      <Card className="booking-form cardbotm" style={{
        position: 'absolute',
        top: '65%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 3
      }}>
        <Card.Body style={{ position: 'relative' }} className='sect'>
          <h3 className="
