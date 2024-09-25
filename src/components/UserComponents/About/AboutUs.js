import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import busImage from '../../../img/aboutBus.png';

const CACHE_KEY = 'aboutUsContent';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const AboutUs = ({ onDataLoaded }) => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTimestamp) < CACHE_EXPIRATION) {
          console.log('AboutUs: Using cached data');
          setAboutContent(JSON.parse(cachedData));
          setLoading(false);
          onDataLoaded();
          return;
        }
      }

      console.log('AboutUs: Fetching fresh data');
      try {
        const response = await axios.get(`${config.apiBaseUrl}/about-us`, { timeout: 10000 });
        setAboutContent(response.data.content);
        localStorage.setItem(CACHE_KEY, JSON.stringify(response.data.content));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime().toString());
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('AboutUs: Error fetching data', error);
        setError('Error fetching About Us content');
        setLoading(false);
        onDataLoaded();
      }
    };

    fetchAboutContent();
  }, [onDataLoaded]);

  console.log('AboutUs: Render cycle', { loading, error });

  if (loading || error) {
    return null;
  }

  return (
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
              src={busImage}
              alt="BSRTC Bus"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                zIndex: 2,
              }} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;