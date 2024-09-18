import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config'; // Ensure this path is correct
import busImage from '../../../img/aboutBus.png'; // Add your bus image path here
import Footer from '../Footer/footer';

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/about-us`)
      .then(response => {
        setAboutContent(response.data.content);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching About Us content');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div style={{ marginTop: '-15vh', position: 'relative', zIndex: 5, marginBottom: '15vh' }}>
        <Container
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Row>
            <Col md={7}>
              <h2 style={{ color: '#5c3b92', fontSize: '40px' }}>About Us</h2>
              <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
            </Col>
            <Col md={5} className="d-flex justify-content-center align-items-center" style={{ position: 'relative' }}>
              <img
                src={busImage} // Your bus image
                alt="BSRTC Bus"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  zIndex: 2, // Ensures the bus image appears above the background circle
                }} />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
