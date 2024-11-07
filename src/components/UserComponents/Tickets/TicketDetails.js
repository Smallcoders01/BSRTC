import React, { useState } from 'react';
import { Form, Button, InputGroup, Row, Col, Alert } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaIdCard } from 'react-icons/fa';
import axios from 'axios';
import config from '../../../config'; // Ensure config is imported

const TicketDetails = () => {
  const [phone, setPhone] = useState('');
  const [tin, setTin] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('language') || 'en';

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketData = { phone, tin };

    axios.post(`${config.apiBaseUrl}/tickets`, ticketData)
      .then(response => {
        setResponse(response.data);
        setError(null);
      })
      .catch(error => {
        setError(language === 'en' ? 'Error submitting ticket details' : 'टिकट विवरण सबमिट करने में त्रुटि');
        setResponse(null);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative', padding: '10px' }}>
        <div
          className="card p-4"
          style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '15px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            position: 'absolute',
            top: '-15vh',
            zIndex: 1,
          }}
        >
          <h4 className="text-center" style={{ color: '#6a1b9a', fontSize: '1.5rem' }}>
            {language === 'en' ? 'Ticket Details' : 'टिकट विवरण'}
          </h4>
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} className="mb-3">
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Text style={{ backgroundColor: '#fff', borderColor: '#ced4da' }}>
                      <FaIdCard style={{ color: '#ffeb3b', fontSize: '1.5rem' }} />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder={language === 'en' ? 'Tin' : 'टिन'}
                      aria-label="Tin"
                      value={tin}
                      onChange={(e) => setTin(e.target.value)}
                      style={{ borderLeft: 'none', boxShadow: 'none', height: '50px', fontSize: '1.2rem' }}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={12} className="mb-3">
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
                    placeholder={language === 'en' ? 'Enter your phone number' : 'अपना फोन नंबर दर्ज करें'}
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
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
                  {language === 'en' ? 'Submit' : 'जमा करें'}
                </Button>
              </Col>
            </Row>
          </Form>

          {response && (
            <Alert variant="success" className="mt-4">
              <h5>{language === 'en' ? 'Ticket Details Submitted Successfully!' : 'टिकट विवरण सफलतापूर्वक सबमिट किया गया!'}</h5>
              <p><strong>{language === 'en' ? 'Tin:' : 'टिन:'}</strong> {response.tin}</p>
              <p><strong>{language === 'en' ? 'Phone:' : 'फोन:'}</strong> {response.phone}</p>
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
