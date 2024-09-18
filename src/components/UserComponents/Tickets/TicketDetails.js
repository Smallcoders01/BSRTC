import React, { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaIdCard } from 'react-icons/fa';

const TicketDetails = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative', padding: '10px' }}>
      <div
        className="card p-4"
        style={{
          width: '100%',
          maxWidth: '500px', // Set max width for larger screens
          borderRadius: '15px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
          position: 'absolute',
          top: '-15vh',
          zIndex: 1,
        }}
      >
        <h4 className="text-center" style={{ color: '#6a1b9a', fontSize: '1.5rem' }}>Ticket Details</h4>
        
        <Form>
          <Row>
            <Col xs={12} className="mb-3">
              {/* Tin Input */}
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text style={{ backgroundColor: '#fff', borderColor: '#ced4da' }}>
                    <FaIdCard style={{ color: '#ffeb3b', fontSize: '1.5rem' }} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Tin"
                    aria-label="Tin"
                    style={{ borderLeft: 'none', boxShadow: 'none', height: '50px', fontSize: '1.2rem' }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col xs={12} className="mb-3">
              {/* Phone Input with Country Dropdown */}
              <Form.Group>
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={phone => setPhone(phone)}
                  inputStyle={{ 
                    width: '100%', 
                    height: '50px', 
                    fontSize: '1.2rem', 
                    border: '1px solid #ced4da', 
                    borderRadius: '5px' 
                  }}
                  buttonStyle={{ border: 'none', background: 'none' }}
                  containerStyle={{ width: '100%' }}
                  placeholder="Enter your phone number" // Placeholder added here
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: '#6a1b9a',
                  borderColor: '#6a1b9a',
                  fontSize: '1.2rem',
                  padding: '12px 0',
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default TicketDetails;
