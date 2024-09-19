import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../components/UserComponents/Home/popular.css';

const AllRoutes = () => {
  const routes = [
    {
      id: 1,
      title: 'Patna to Delhi',
      description: 'A Paris Adventure',
      image: '/Routes/delhi.jpg',
    },
    {
      id: 2,
      title: 'Patna to Kathmandu',
      description: 'A Paris Adventure',
      image: '/Routes/khatmandu.png',
    },
    {
      id: 3,
      title: 'Patna to Rajgir',
      description: 'London Eye Adventure',
      image: '/Routes/patna.jpeg',
    },
    {
      id: 4,
      title: 'Delhi to Patna',
      description: 'Amazing Streets',
      image: '/Routes/Rajgir.webp',
    },
    {
        id: 1,
        title: 'Patna to Delhi',
        description: 'A Paris Adventure',
        image: '/Routes/delhi.jpg',
      },
      {
        id: 2,
        title: 'Patna to Kathmandu',
        description: 'A Paris Adventure',
        image: '/Routes/khatmandu.png',
      },
      {
        id: 3,
        title: 'Patna to Rajgir',
        description: 'London Eye Adventure',
        image: '/Routes/patna.jpeg',
      },
      {
        id: 4,
        title: 'Delhi to Patna',
        description: 'Amazing Streets',
        image: '/Routes/Rajgir.webp',
      },
    // Add more routes if needed
  ];

  return (
    <Container className="py-5 mt-5 pop">
      <h2 className="fw-bold mb-4 text-center">All Popular Routes</h2>
      <Row>
        {routes.map((route) => (
          <Col key={route.id} sm={12} md={6} lg={3} className="mb-4">
            <Card
              className="shadow-sm h-100 text-white"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${route.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                  width: '100%',
                }}
              ></div>
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
        ))}
      </Row>
    </Container>
  );
};

export default AllRoutes;
