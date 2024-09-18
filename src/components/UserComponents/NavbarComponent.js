import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Modal, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import { LinkContainer } from 'react-router-bootstrap';
import bus from '../../img/loginbus.jpeg';
const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false); // State to control login modal visibility

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

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
            </Nav>
            <Button
              variant="secondary"
              className="ms-2"
              style={{ color: 'gold', backgroundColor: 'transparent', borderColor: 'transparent' }}
              onClick={handleShowLogin} // Show the login modal on click
            >
              Login
            </Button>
            <LinkContainer to="/signup">
              <Nav.Link>
                <Button
                  variant=""
                  className="ms-2"
                  style={{ backgroundColor: '#6B4190', color: 'white', width: '100px', paddingTop: '12px', paddingBottom: '12px', borderRadius: '10px' }}
                >
                  Sign Up
                </Button>
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Modal */}
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
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

// LoginModal component
const LoginModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>B.S.R.T.C Login/Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-2" style={{ backgroundColor: '#6B4190' }}>
                Continue
              </Button>
              <div className="text-center">Or login with</div>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="outline-primary" className="me-2" style={{ borderColor: '#6B4190', color: '#6B4190' }}>OTP</Button>
                <Button variant="outline-danger" className="ms-2" style={{ borderColor: '#DB4437', color: '#DB4437' }}>Google</Button>
              </div>
            </Form>
          </Col>
          <Col md={6}>
            <img src={bus} alt="Login Visual" className="img-fluid" />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default NavbarComponent;
