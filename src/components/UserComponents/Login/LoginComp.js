import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bus from '../../../img/loginbus.jpg';
import './login.css';
import ReCAPTCHA from 'react-google-recaptcha';
import config from '../../../config'; // Adjust the path as needed

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const { user, login, logout } = useContext(AuthContext);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA.');
      return;
    }
    try {
      await login(email, password, captchaToken); // Include captchaToken in the login function
      handleClose();
      toast.success('Login successful!');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          // Check if the user is not verified
          if (err.response.data.message.includes('not verified')) {
            toast.error('Your email is not verified. Please verify your email before logging in.');
          } else {
            toast.error('Your account is locked. Please try again later.');
          }
        } else {
          toast.error('Invalid email or password. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully!');
  };

  return (
    <>
      {!user ? (
        <Button 
          variant="secondary"
          style={{ color: 'white', backgroundColor: '#6B4190', borderColor: 'transparent', marginTop:'-10px', width:'5rem' }}
          onClick={handleShow}
          className='login'
        >
          Login
        </Button>
      ) : (
        <Button 
          variant="secondary"
          style={{ color: 'gold', backgroundColor: 'transparent', borderColor: 'transparent', marginTop:'-10px' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
        <Modal.Body className="p-0" style={{ height: '400px' }}>
          <Row className="h-100 g-0">
            <Col md={6} className="d-flex flex-column justify-content-center p-4">
              <h2 className="text-center mb-4 login-title" style={{ color: '#6B4190', fontWeight: 'bold' }}>B.S.R.T.C</h2>
              <h4 className="login-subtitle">Login/Signup</h4>

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3 control">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    className='control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3 control">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter your password" 
                    className='control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <ReCAPTCHA
                  sitekey={config.recaptchaSiteKey}
                  onChange={(token) => setCaptchaToken(token)}
                />
                <Button variant="primary" type="submit" className="w-100 mb-2 cont-btn" style={{ backgroundColor: '#6B4190' }}>
                  Continue
                </Button>
              </Form>
            </Col>

            <Col md={6} className="h-100 p-0">
              <img src={bus} alt="Login Visual" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;