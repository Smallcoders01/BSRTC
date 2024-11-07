import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import busImage from '../../../img/aboutBus.png';

const CACHE_KEY = 'aboutUsContent';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const AboutUs = ({ onDataLoaded }) => {
  const [content, setContent] = useState({
    aboutUs: '',
    vision: '',
    mission: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchContent = async () => {
      const cachedData = localStorage.getItem(`${CACHE_KEY}_${language}`);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_${language}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTimestamp) < CACHE_EXPIRATION) {
          console.log('AboutUs: Using cached data');
          setContent(JSON.parse(cachedData));
          setLoading(false);
          onDataLoaded();
          return;
        }
      }

      console.log('AboutUs: Fetching fresh data');
      try {
        const response = await axios.get(`${config.apiBaseUrl}/about-us?lang=${language}`, { timeout: 10000 });
        const data = {
          aboutUs: response.data[`aboutUs${language === 'en' ? 'En' : 'Hi'}`],
          vision: response.data[`vision${language === 'en' ? 'En' : 'Hi'}`],
          mission: response.data[`mission${language === 'en' ? 'En' : 'Hi'}`]
        };
        setContent(data);
        localStorage.setItem(`${CACHE_KEY}_${language}`, JSON.stringify(data));
        localStorage.setItem(`${CACHE_KEY}_${language}_timestamp`, new Date().getTime().toString());
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('AboutUs: Error fetching data', error);
        setError('Error fetching content');
        setLoading(false);
        onDataLoaded();
      }
    };

    fetchContent();
  }, [onDataLoaded, language]);

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
            <h2 style={{ color: '#5c3b92', fontSize: '40px' }}>
              {language === 'en' ? 'About Us' : 'हमारे बारे में'}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: content.aboutUs }} />
            <h3 style={{ color: '#5c3b92', fontSize: '30px', marginTop: '20px' }}>
              {language === 'en' ? 'Vision' : 'दृष्टि'}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: content.vision }} />
            <h3 style={{ color: '#5c3b92', fontSize: '30px', marginTop: '20px' }}>
              {language === 'en' ? 'Mission' : 'लक्ष्य'}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: content.mission }} />
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