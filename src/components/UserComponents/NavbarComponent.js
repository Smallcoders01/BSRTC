import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from '../UserComponents/Login/LoginComp';
import SignupModal from '../UserComponents/Login/SignComp';
import { AuthContext } from '../../context/AuthContext';

const NavbarComponent = ({ onToggle }) => {
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(!expanded);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <Navbar
        expand="lg"
        bg={expanded ? "custom" : "transparent"}
        variant={expanded ? "light" : "dark"}
        expanded={expanded}
        onToggle={handleToggle}
        style={{
          zIndex: 2,
          backgroundColor: expanded ? "#F5EFFF" : "transparent",
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold"
            style={{ fontSize: '2rem', color: expanded ? "#000" : "#fff" }}
          >
            B.S.R.T.C
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto justify-content-center w-100">
              <Nav.Link as={Link} to="/" style={navStyle(expanded, isActive('/'))}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={navStyle(expanded, isActive('/about'))}>About Us</Nav.Link>
              <Nav.Link as={Link} to="/gallery" style={navStyle(expanded, isActive('/gallery'))}>Gallery</Nav.Link>
              <Nav.Link as={Link} to="/directory" style={navStyle(expanded, isActive('/directory'))}>Directory</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={navStyle(expanded, isActive('/contact'))}>Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/ticket" style={navStyle(expanded, isActive('/ticket'))}>Tickets</Nav.Link>
              {!user && <SignupModal />}
              <LoginModal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const navStyle = (expanded, isActive) => ({
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  fontFamily: 'Poppins, sans-serif',
  color: isActive ? '#fff' : (expanded ? '#000' : '#fff'),
  fontWeight: '500',
  letterSpacing: '1px',
  padding: isActive ? '8px 20px' : '8px 15px',
  margin: '0 5px',
  backgroundColor: isActive ? '#86469C' : 'transparent',
  borderRadius: '25px',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
});

export default NavbarComponent;
