import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import bus from '../../../img/loginbus.jpeg'; // Adjust the path as necessary
import './login.css'; // Import custom CSS

const LoginModal = () => {
  const [show, setShow] = useState(false); // Manage modal visibility locally
  const [email, setEmail] = useState(''); // Track email input
  const [password, setPassword] = useState(''); // Track password input
  const [error, setError] = useState(''); // Track errors
  const [success, setSuccess] = useState(''); // Track success message
  const { user, login, logout } = useContext(AuthContext);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      handleClose();
      setSuccess('Login successful!');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    setSuccess('');
  };

  return (
    <>
      {!user ? (
        <Button 
          variant="secondary"
          style={{ color: 'white', backgroundColor: '#6B4190', borderColor: 'transparent',marginTop:'-10px' }}
          onClick={handleShow}
        >
          Login
        </Button>
      ) : (
        <Button 
          variant="secondary"
          style={{ color: 'gold', backgroundColor: 'transparent', borderColor: 'transparent',marginTop:'-10px' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Body className="p-0" style={{ height: '400px' }}> {/* Removed padding, set height */}
          <Row className="h-100 g-0"> {/* Ensure the row and its children stretch, no gutter */}
            {/* Left section: Contains the title, form, and 'Or login with' */}
            <Col md={6} className="d-flex flex-column justify-content-center p-4"> {/* Added padding to left side */}
              <h2 className="text-center mb-4 login-title" style={{ color: '#6B4190', fontWeight: 'bold' }}>B.S.R.T.C</h2> {/* Custom CSS class */}
              <h4 className="login-subtitle">Login/Signup</h4>
              
              {/* Error message display */}
              {error && <Alert variant="danger">{error}</Alert>}
              {/* Success message display */}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3 control">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    className='control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Set email state
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3 control">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    className='control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Set password state
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-2 cont-btn" style={{ backgroundColor: '#6B4190' }}>
                  Continue
                </Button>
              </Form>

              {/* "Or login with" section */}
              <div className="text-center">Or login with</div>
              <div className="d-flex justify-content-center mt-3">
                <Button variant="outline-primary" className="me-2 btns" style={{ borderColor: '#6B4190' }}>
                  OTP
                </Button>
                <Button variant="outline-danger" className="ms-2 btns" style={{ borderColor: '#DB4437' }}>
                  Google+
                </Button>
              </div>
            </Col>

            {/* Right section: Full height image */}
            <Col md={6} className="h-100 p-0"> {/* Removed padding, ensure full height */}
              <img src={bus} alt="Login Visual" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} /> {/* Full height and cover */}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;