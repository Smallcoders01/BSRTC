import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config'; // Adjust the path to the correct location of your config file
import '../components/UserComponents/Home/popular.css';
import Footer from '../components/UserComponents/Footer/footer'
import Banner from '../components/UserComponents/Banner';
const AllRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the routes from the backend API
    axios.get(`${config.apiBaseUrl}/popular-routes`)
      .then(response => {
        setRoutes(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching routes');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
  <Banner/>
    <Container className="py-5 mt-5 pop">
      <h2 className="fw-bold mb-4 text-center">All Popular Routes</h2>
      <Row>
        {routes.map((route) => {
          const imageUrl = `${config.baseUrl}${route.imageUrl}`;
          console.log('Image URL:', imageUrl); // Log the image URL for debugging
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
                    background: 'rgba(0, 0, 0, 0.3)',
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
            </Col>
          );
        })}
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default AllRoutes;