import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../UserComponents/Login/LoginComp';
import SignupModal from '../UserComponents/Login/SignComp';
import { AuthContext } from '../../context/AuthContext';

const NavbarComponent = ({ onToggle }) => {
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(!expanded); // Notify the parent component about the toggle state
  };

  return (
    <>
      <Navbar
        expand="lg"
        bg={expanded ? "custom" : "transparent"} // Apply the custom color
        variant={expanded ? "light" : "dark"}  // Adjust text color based on background
        expanded={expanded}
        onToggle={handleToggle}
        style={{
          zIndex: 2,
          backgroundColor: expanded ? "#F5EFFF" : "transparent", // Replace with your color code
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold"
            style={{ fontSize: '2rem', color: expanded ? "#000" : "#fff" }} // Brand color changes based on toggle
          >
            B.S.R.T.C
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto justify-content-center w-100">
              <Nav.Link as={Link} to="/" style={navStyle(expanded)}>Home</Nav.Link>
              <Nav.Link as={Link} to="/about" style={navStyle(expanded)}>About Us</Nav.Link>
              <Nav.Link as={Link} to="/gallery" style={navStyle(expanded)}>Gallery</Nav.Link>
              <Nav.Link as={Link} to="/directory" style={navStyle(expanded)}>Directory</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={navStyle(expanded)}>Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/ticket" style={navStyle(expanded)}>Tickets</Nav.Link>
              {!user && <SignupModal />}
              <LoginModal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

// Dynamically adjust nav link styles based on expanded state
const navStyle = (expanded) => ({
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  fontFamily: 'Poppins, sans-serif',
  color: expanded ? '#000' : '#fff', // Text color changes based on expanded state
  fontWeight: '500',
  letterSpacing: '1px',
  padding: '0 15px',
  marginBottom: '6px'
});

export default NavbarComponent;
