import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import { LinkContainer } from 'react-router-bootstrap';
const NavbarComponent = () => {
  return (
    <Navbar expand="lg" bg="transparent" variant="dark" style={{ position: 'relative', zIndex: 2 }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ fontSize: '2rem' }}>
          B.S.R.T.C
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto justify-content-center w-100">
            <Nav.Link as={Link} to="/" style={navStyle}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={navStyle}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/about" style={navStyle}>Gallery</Nav.Link>
            <Nav.Link as={Link} to="/about" style={navStyle}>Directory</Nav.Link>
            <Nav.Link as={Link} to="/contact" style={navStyle}>Contact Us</Nav.Link>
            {/* Add more links */}
          </Nav>
          <LinkContainer to="/login">
        <Nav.Link>
          <Button variant="secondary" className="ms-2" style={{ color: 'gold', backgroundColor: 'transparent', borderColor: 'transparent' }}>
            Login
          </Button>
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/signup">
        <Nav.Link>
          <Button variant="primary" className="ms-2">
            Sign Up
          </Button>
        </Nav.Link>
      </LinkContainer>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const navStyle = {
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  fontFamily: 'Poppins, sans-serif',
  color: 'black',
  fontWeight: '500',
  letterSpacing: '1px',
  padding: '0 15px'
};

export default NavbarComponent;
