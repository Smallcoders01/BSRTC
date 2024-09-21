import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import LoginModal from '../UserComponents/Login/LoginComp'; // Import the separated LoginModal
import SignupModal from '../UserComponents/Login/SignComp';
import { AuthContext } from '../../context/AuthContext';

const NavbarComponent = () => {
  const { user } = useContext(AuthContext);

  console.log('Rendering NavbarComponent');
  return (
    <>
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
              <Nav.Link as={Link} to="/gallery" style={navStyle}>Gallery</Nav.Link>
              <Nav.Link as={Link} to="/directory" style={navStyle}>Directory</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={navStyle}>Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/ticket" style={navStyle}>Tickets</Nav.Link>
              {!user && <SignupModal />}
              <LoginModal />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const navStyle = {
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  fontFamily: 'Poppins, sans-serif',
  color: 'white',
  fontWeight: '500',
  letterSpacing: '1px',
  padding: '0 15px'
};

export default NavbarComponent;