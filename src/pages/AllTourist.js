import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config';
import '../components/UserComponents/Home/popular.css';
import Footer from '../components/UserComponents/Footer/footer';
import Banner from '../components/UserComponents/Banner';

const AllTourist = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const language = localStorage.getItem('language') || 'en';
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/tourist-destinations`)
      .then(response => {
        setDestinations(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching tourist destinations');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewDetails = (destinationId) => {
    if (selectedDestination === destinationId) {
      setSelectedDestination(null);
    } else {
      setSelectedDestination(destinationId);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Banner/>
      <Container className="py-5 mt-5 pop">
        <h2 className="fw-bold mb-4 text-center">
          {language === 'en' ? 'Explore All Tourist Destinations In Bihar' : 'बिहार के सभी पर्यटन स्थलों की खोज करें'}
        </h2>
        {isMobile ? (
          <Row>
            {destinations.map((destination) => (
              <Col key={destination._id} xs={12} className="mb-4">
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
                    src={`${config.baseUrl}${destination.image}`}
                    alt={destination.name}
                    style={{
                      height: '250px',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.ImgOverlay
                    className="d-flex flex-column justify-content-end"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)',
                      padding: '15px',
                      borderRadius: '0 0 10px 10px',
                    }}
                  >
                    <Card.Title 
                      className="fw-bold mb-1"
                      style={{
                        fontSize: '0.95rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                    >
                      {destination.name}
                    </Card.Title>
                    
                    {selectedDestination === destination._id && destination.description && (
                      <Card.Text 
                        className="mb-2"
                        style={{
                          fontSize: '0.7rem',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          lineHeight: '1.1',
                          margin: '4px 0',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          padding: '4px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {destination.description}
                      </Card.Text>
                    )}

                    <Button
                      variant="link"
                      className="text-white p-0 align-self-end"
                      onClick={() => handleViewDetails(destination._id)}
                      style={{
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        backgroundColor: '#7A1CAC',
                        padding: '4px 8px !important',
                        borderRadius: '4px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {selectedDestination === destination._id ? 
                        (language === 'en' ? 'Close' : 'बंद करें') :
                        (language === 'en' ? 'View Details' : 'विवरण देखें')}
                    </Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            {destinations.map((destination) => (
              <Col key={destination._id} sm={12} md={6} lg={3} className="mb-4">
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
                    src={`${config.baseUrl}${destination.image}`}
                    alt={destination.name}
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.ImgOverlay
                    className="d-flex flex-column justify-content-end"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)',
                      padding: '15px',
                      borderRadius: '0 0 10px 10px',
                    }}
                  >
                    <Card.Title 
                      className="fw-bold mb-1"
                      style={{
                        fontSize: '0.95rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                      }}
                    >
                      {destination.name}
                    </Card.Title>
                    
                    {selectedDestination === destination._id && destination.description && (
                      <Card.Text 
                        className="mb-2"
                        style={{
                          fontSize: '0.7rem',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                          lineHeight: '1.1',
                          margin: '4px 0',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          padding: '4px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        {destination.description}
                      </Card.Text>
                    )}

                    <Button
                      variant="link"
                      className="text-white p-0 align-self-end"
                      onClick={() => handleViewDetails(destination._id)}
                      style={{
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        backgroundColor: '#7A1CAC',
                        padding: '4px 8px !important',
                        borderRadius: '4px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {selectedDestination === destination._id ? 
                        (language === 'en' ? 'Close' : 'बंद करें') :
                        (language === 'en' ? 'View Details' : 'विवरण देखें')}
                    </Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Footer/>
    </>
  );
};

export default AllTourist;