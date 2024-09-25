import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import axios from 'axios';

import config from '../../../config';
import './popular.css';

const PopularRoutes = ({ onBookNow }) => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // Check for screen width changes to toggle between slider and grid
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/popular-routes`)
      .then(response => {
        setRoutes(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching popular routes');
        setLoading(false);
      });
  }, []);

  const handleBookNow = (route) => {
    if (onBookNow) {
      onBookNow(route.from, route.to);
    } else {
      console.log('Booking:', route.from, 'to', route.to);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container
      className="py-5 mt-5 pop"
      style={{
        border: '1px solid #eee',
        borderRadius: '20px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        backgroundColor: '#fff',
        width: '80%',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4 popFLex">
        <div>
          <h2 className="fw-bold">Popular Routes</h2>
          <p>
            Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
          </p>
        </div>
        <Button
          variant=""
          className="fw-bold view"
          style={{
            borderRadius: '8px',
            border: '2px solid #6f42c1',
            padding: '6px 18px',
            width: '100px',
            marginLeft: '20px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/all-routes')}
        >
          View All
        </Button>
      </div>

      {/* Responsive Layout: Carousel for small screens, Grid for larger screens */}
      {isMobile ? (
        <Carousel interval={null} indicators={false} controls={true}>
          {routes.map((route) => {
            const imageUrl = `${config.baseUrl}${route.imageUrl}`;
            return (
              <Carousel.Item key={route._id}>
                <Card
                  className="shadow-sm h-100 text-white"

                  style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={route.title}
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.ImgOverlay
                    className="d-flex flex-column justify-content-end"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)', // dark overlay for readability
                      padding: '20px',
                      borderRadius: '0 0 15px 15px',
                    }}
                  >
                    <Card.Title className="fw-bold">{route.title}</Card.Title>
                    <Card.Text>{route.description}</Card.Text>
                    <Button
                      variant="warning"
                      className="fw-bold"
                      style={{
                        color: '#fff',
                        borderRadius: '3px',
                        padding: '5px 10px',
                        backgroundColor: '#ffcc00',
                        border: 'none',
                      }}
                    >
                      Book Now
                    </Button>
                  </Card.ImgOverlay>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <Row>
          {routes.map((route) => {
            const imageUrl = `${config.baseUrl}${route.imageUrl}`;
            return (
              <Col key={route._id} sm={12} md={6} lg={3} className="mb-4">
                <Card
                  className="shadow-sm h-100 text-white"
                  style={{

                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={route.title}
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.ImgOverlay
                    className="d-flex flex-column justify-content-end"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)', // dark overlay for readability
                      padding: '20px',
                      borderRadius: '0 0 15px 15px',

                    }}
                    onClick={() => handleBookNow(route)}
                  >
                    <Card.Title className="fw-bold">{route.title}</Card.Title>
                    <Card.Text>{route.description}</Card.Text>
                    <Button
                      variant="warning"
                      className="fw-bold"
                      style={{
                        color: '#fff',
                        borderRadius: '3px',
                        padding: '5px 10px',
                        backgroundColor: '#ffcc00',
                        border: 'none',
                      }}
                    >
                      Book Now
                    </Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default PopularRoutes;
