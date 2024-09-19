import React, { useState } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import bus from '../../../img/loginbus.jpeg'; // Adjust the path as necessary
import './signup.css'; // Import custom CSS

const SignupModal = () => {
  const [show, setShow] = useState(false); // Manage modal visibility locally

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button 
        variant="secondary"
        style={{ color: 'white', backgroundColor: '#6B4190', borderColor: 'transparent',width:'100px' }}
        onClick={handleShow}
      >
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Body className="p-0" style={{ height: '600px' }}> {/* Removed padding, set height */}
          <Row className="h-100 g-0"> {/* Ensure the row and its children stretch, no gutter */}
            {/* Left section: Contains the title, form, and 'Or sign up with' */}
            <Col md={6} className="d-flex flex-column justify-content-center p-4"> {/* Added padding to left side */}
              <h2 className="text-center mb-4 signup-title" style={{ color: '#6B4190', fontWeight: 'bold' }}>B.S.R.T.C</h2> {/* Custom CSS class */}
              <h4 className="signup-subtitle">Sign Up</h4>
              <Form>
                <Form.Group controlId="formName" className="mb-3 control">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" className='control' />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3 control">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" className='control' />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3 control">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" className='control' />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3 control">
                  <Form.Label> Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" className='control' />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-2 cont-btn" style={{ backgroundColor: '#6B4190' }}>
                  Sign Up
                </Button>
              </Form>

              {/* "Or sign up with" section */}
              <div className="text-center">Or sign up with</div>
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
              <img src={bus} alt="Signup Visual" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} /> {/* Full height and cover */}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupModal;
