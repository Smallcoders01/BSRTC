import React from 'react';
import { Container } from 'react-bootstrap';
import busbImage from '../../img/evbus5.jpg';
import NavbarComponent from './NavbarComponent';
import './Banner.css';

const Banner = ({ title }) => {
  const handleNavbarToggle = (expanded) => {
    console.log("Navbar toggled:", expanded);
  };

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <div className="banner" style={{
        position: 'relative',
        backgroundImage: `url(${busbImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50vh',
        color: 'white',
        textAlign: 'left',
        borderRadius: '20px',
        overflow: 'visible'
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(50, 0, 50, 0.6)',
          zIndex: 1,
          borderRadius: '20px'
        }}></div>

        {/* Navbar Container */}
        <div style={{ 
          position: 'relative', 
          zIndex: 1050 
        }}>
          <NavbarComponent onToggle={handleNavbarToggle} />
        </div>

        {/* Fixed Title Container */}
        <div className="banner-title-wrapper">
          {title && (
            <h1 className="banner-title">
              {title}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
