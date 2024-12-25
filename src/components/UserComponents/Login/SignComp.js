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
  const [otp, setOtp] = useState(''); // State for OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // State to check if OTP has been sent
  const [otpEmail, setOtpEmail] = useState(''); // State for email input during OTP verification
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

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpEmailChange = (e) => {
    setOtpEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true // If your API uses cookies for authentication
      });

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
        setIsOtpSent(true); // Set OTP sent state to true
        // Do not clear the form data here
      } else {
        setSuccess('Signup successful! Please check your email for the OTP.');
        setIsOtpSent(true); // Set OTP sent state to true
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Error signing up. Please try again.');
      } else {
        setError('Error setting up request. Please try again.');
      }
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
  
    if (!otpEmail.trim()) { // Check if the email field is empty
      setError('Please enter your email ID to resend the OTP.');
      return;
    }
  
    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/resend-otp`, { email: otpEmail }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data && response.data.message) {
        setSuccess(response.data.message); // Display success message
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Error resending OTP. Please try again.');
      } else {
        setError('Error resending OTP. Please try again.');
      }
    }
  };
  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('Verifying OTP with payload:', {
      email: otpEmail, // Use the email entered by the user for OTP verification
      otp: otp
    });

    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/verify-otp`, {
        email: otpEmail, // Use the email entered by the user for OTP verification
        otp: otp
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true // If your API uses cookies for authentication
      });

      console.log('OTP verification response:', response.data);

      if (response.data && response.data.message) {
        setSuccess(response.data.message);
        setShow(false); // Close the modal on successful verification
        setOtp(''); // Clear the OTP input
        setOtpEmail(''); // Clear the OTP email input
        // Clear the form data only after successful OTP verification
        setFormData({ name: '', email: '', phoneNumber: '', password: '' });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data); // Log the response data
        setError(error.response.data.message || 'Error verifying OTP. Please try again.');
      } else {
        setError('Error verifying OTP. Please try again.');
      }
    }
  };

  return (
    <>
      <Button 
        variant="secondary"
        style={{ color: 'gold', backgroundColor: 'transparent', borderColor: 'transparent', marginTop: '-10px', width: '6rem' }}
        onClick={handleShow}
        className='sign'>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Body className="p-0" style={{ height: '500px' }}>
          <Row className="h-100 g-0">
            <Col md={6} className="d-flex flex-column justify-content-center p-4">
              <h2 className="text-center mb-4 login-title" style={{ color: '#6B4190', fontWeight: 'bold' }}>B.S.R.T.C</h2>
              <h4 className="login-subtitle">{isOtpSent ? 'Verify OTP' : 'Signup'}</h4>

              {/* Error message display */}
              {error && <Alert variant="danger">{error}</Alert>}
              {/* Success message display */}
              {success && <Alert variant="success">{success}</Alert>}

              {!isOtpSent ? (
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
              ) : (
                <Form onSubmit={handleOtpSubmit}>
   <Form.Group controlId="formOtpEmail" className="mb-3 control">
    <Form.Label>Email Address</Form.Label>
    <Form.Control 
      type="email" 
      placeholder="Enter your email again" 
      value={otpEmail} 
      onChange={handleOtpEmailChange} 
      className='control' 
    />
  </Form.Group>
  <Form.Group controlId="formOtp" className="mb-3 control">
    <Form.Label>Enter OTP</Form.Label>
    <Form.Control 
      type="text" 
      placeholder="Enter the OTP sent to your email" 
      value={otp} 
      onChange={handleOtpChange} 
      className='control' 
    />
  </Form.Group>
  <Button variant="primary" type="submit" className="w-100 mb-2 cont-btn" style={{ backgroundColor: '#6B4190' }}>
    Verify OTP
  </Button>
  <Button 
    variant="link" 
    onClick={handleResendOtp} 
    className="w-100 mt-2" 
    style={{ color: '#6B4190', textDecoration: 'underline' }}>
    Resend OTP
  </Button>
</Form>     
              )}

              
            </Col>

            <Col md={6} className="h-100 p-0">
              <img src={bus} alt="Signup Visual" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupModal;