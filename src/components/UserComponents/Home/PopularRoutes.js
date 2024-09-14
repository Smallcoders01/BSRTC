import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PopularRoutes = () => {
  // Dummy data for the routes
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
  ];

  return (
    <Container
      className="py-5 mt-5"
      style={{
        border: '1px solid #eee',
        borderRadius: '20px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        backgroundColor: '#fff',
      }}
    >
      {/* Title and Subtitle Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Popular Routes</h2>
          <p>
            Going somewhere to celebrate this season? Whether you’re going home or
            somewhere to roam, we’ve got the travel tools to get you to your destination.
          </p>
        </div>
        <Button
          variant="outline-primary"
          className="fw-bold"
          style={{
            borderRadius: '8px',
            border: '2px solid #6f42c1',
            color: '#6f42c1',
            padding: '10px 20px',
          }}
        >
          View All
        </Button>
      </div>

      {/* Routes Cards Section */}
      <Row>
        {routes.map((route) => (
          <Col key={route.id} sm={12} md={6} lg={3} className="mb-4">
            <Card
              className="shadow-sm h-100"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'transform 0.2s',
              }}
            >
              <Card.Img
                variant="top"
                src={route.image}
                alt={route.title}
                style={{
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fw-bold">{route.title}</Card.Title>
                <Card.Text>{route.description}</Card.Text>
                <Button
                  variant="warning"
                  className="mt-auto fw-bold"
                  style={{
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    backgroundColor: '#ffcc00',
                    border: 'none',
                  }}
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularRoutes;
