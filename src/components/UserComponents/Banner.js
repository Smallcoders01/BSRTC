import React from 'react';
import { Container } from 'react-bootstrap';
import busbImage from '../../img/evbus5.jpg';

import NavbarComponent from './NavbarComponent'; // Import NavbarComponent

const Banner = () => {
  // Define the handleNavbarToggle function
  const handleNavbarToggle = (expanded) => {
    console.log("Navbar toggled:", expanded);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Banner Section */}
      <div className="banner" style={{
        position: 'relative',
        backgroundImage: `url(${busbImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50vh',
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
          background: 'rgba(50, 0, 50, 0.6)', // Darker purple with higher opacity
          zIndex: 1
        }}></div>

        {/* Use NavbarComponent with onToggle */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <NavbarComponent onToggle={handleNavbarToggle} /> {/* Pass onToggle */}
        </div>

        {/* Main Banner Text */}
        <Container className="d-flex flex-column justify-content-center align-items-start h-100" style={{
          position: 'relative',
          marginTop: '-180px'
        }}>
        </Container>
      </div>

      {/* Booking Form Section */}
    </div>
  );
};

export default Banner;
