import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import busImage from '../../../img/aboutBus.png'; // Add your bus image path here
import Footer from '../Footer/footer';

const AboutUs = () => {
  return (
    <><div style={{ marginTop: '-15vh', position: 'relative', zIndex: 5, marginBottom: '15vh' }}>
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
            <p>
              Bihar State Road Transport Corporation (BSRTC) is a state-owned road transportation service in Bihar.
              Established in 1953 under Rajya Transport, BSRTC was reconstituted in 1959 under the provisions of the Road
              Transport Corporation Act 1950 and is wholly owned by the Government of Bihar.
            </p>
            <p>
              BSRTC operates under the provisions of the State Road Transport Act 1950, providing transportation services
              to nearly 100,000 passengers daily across various inter-state and intra-state routes. We are dedicated to
              delivering reliable transportation services to all travelers.
            </p>
            <p>
              We are also committed to environmental sustainability and plan to launch electric buses in March and CNG
              buses for intra-state movement. BSRTC has received numerous recognitions for providing excellent
              transportation services during the COVID-19 pandemic.
            </p>
            <p>
              Our top routes are Patna-Ghaziabad, Delhi-Ghaziabad, Kishanganj-Ghaziabad, Buxar-Ghaziabad, and many more.
              We are also running services between Patna-Kathmandu-Patna, the first international route of Bihar.
            </p>
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
    </div><Footer /></>
  );
};

export default AboutUs;
