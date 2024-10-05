import React, { useState } from 'react';
import { Modal, Form, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config'; // Make sure this path is correct
import bus from '../../../img/loginbus.jpg'; // Adjust the path as necessary
import './login.css'; // Import custom CSS

const SignupModal = () => {
  const [show, setShow] = useState(false); // Manage modal visibility locally
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers here
        },
        withCredentials: true // If your API uses cookies for authentication
      });

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
        setShow(false);
        // Optionally, clear the form
        setFormData({name: '', email: '', phoneNumber: '', password: ''});
      } else {
        setSuccess('Signup successful!');
        setShow(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Error signing up. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up request. Please try again.');
      }
    }
  };

  return (
    <>
      <Button 
        variant="secondary"

        style={{ color: 'gold', backgroundColor: 'transparent', borderColor: 'transparent',marginTop:'-10px',width:'6rem' }}

        onClick={handleShow}
      className='sign'>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Body className="p-0" style={{ height: '500px' }}> {/* Adjusted height for additional fields */}
          <Row className="h-100 g-0"> {/* Ensure the row and its children stretch, no gutter */}
            {/* Left section: Contains the title, form, and 'Or signup with' */}
            <Col md={6} className="d-flex flex-column justify-content-center p-4"> {/* Added padding to left side */}
              <h2 className="text-center mb-4 login-title" style={{ color: '#6B4190', fontWeight: 'bold' }}>B.S.R.T.C</h2> {/* Custom CSS class */}
              <h4 className="login-subtitle">Signup</h4>

              {/* Error message display */}
              {error && <Alert variant="danger">{error}</Alert>}
              {/* Success message display */}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3 control">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className='control' 
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3 control">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className='control' 
                  />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber" className="mb-3 control">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your phone number" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    className='control' 
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3 control">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className='control' 
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-2 cont-btn" style={{ backgroundColor: '#6B4190' }}>
                  Continue
                </Button>
              </Form>

              {/* "Or signup with" section */}
              <div className="text-center">Or signup with</div>
              <div className="d-flex justify-content-center mt-3">
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