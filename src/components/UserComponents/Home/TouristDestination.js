import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import '../../UserComponents/Home/popular.css';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TouristDestination = ({ onBookNow }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const navigate = useNavigate();
  const language = localStorage.getItem('language') || 'en';
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/tourist-destinations`)
      .then(response => {
        setDestinations(response.data.slice(0, 8));
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
      setSelectedDestination(null); // Close if already open
    } else {
      setSelectedDestination(destinationId); // Open the clicked destination
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-5 border-secondary rounded-4 p-4 shadow-lg bg-light" style={{ width: '80%', fontFamily: 'Montserrat, sans-serif' }}>
      <div className="row justify-content-center">
        <div className="col-lg-11 col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-4 popFLex">
            <div>
              <h2 className="fw-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {language === 'en' ? 'Tourist Destinations' : 'पर्यटक स्थल'}
              </h2>
              <p className="text-muted" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {language === 'en'
                  ? "Planning to explore Bihar this season? Whether you're heading home or off on an adventure, we have the travel resources to get you to your destination."
                  : 'इस मौसम में बिहार की खोज करने की योजना बना रहे हैं? चाहे आप घर जा रहे हों या किसी साहसिक यात्रा पर, हमारे पास आपको आपके गंतव्य तक पहुंचाने के लिए यात्रा संसाधन हैं।'}
              </p>
            </div>
          </div>

          {isMobile ? (
            <Carousel interval={null} indicators={false} controls={true}>
              {destinations.map((destination, index) => (
                <Carousel.Item key={index}>
                  <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3" 
                    style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)', transform: 'translateY(-5px)' }}>
                    <img
                      src={`${config.baseUrl}${destination.image}`}
                      className="card-img-top img-fluid rounded-3"
                      alt={destination.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-overlay d-flex flex-column justify-content-end p-3 rounded-3">
                      <h5 className="card-title text-white mb-1" 
                        style={{ 
                          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
                          fontSize: '0.95rem',
                          fontWeight: '600'
                        }}>
                        {destination.name}
                      </h5>
                      {selectedDestination === destination._id && destination.description && (
                        <p className="card-text text-white mb-2" style={{ 
                          fontSize: '0.7rem',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                          lineHeight: '1.1',
                          margin: '4px 0',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          padding: '4px 6px',
                          borderRadius: '4px'
                        }}>
                          {destination.description}
                        </p>
                      )}
                      <button 
                        onClick={() => handleViewDetails(destination._id)}
                        className="btn text-white btn-sm shadow-sm align-self-end" 
                        style={{ 
                          backgroundColor: '#7A1CAC',
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.5rem'
                        }}
                      >
                        {selectedDestination === destination._id ? 
                          (language === 'en' ? 'Close' : 'बंद करें') :
                          (language === 'en' ? 'View Details' : 'विवरण देखें')}
                      </button>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  {destinations.slice(0, 4).map((destination, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                      <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3" 
                        style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)', transform: 'translateY(-5px)' }}>
                        <img
                          src={`${config.baseUrl}${destination.image}`}
                          className="card-img-top img-fluid rounded-3"
                          alt={destination.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-overlay d-flex flex-column justify-content-end p-3 rounded-3">
                          <h5 className="card-title text-white mb-1" 
                            style={{ 
                              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
                              fontSize: '0.95rem',
                              fontWeight: '600'
                            }}>
                            {destination.name}
                          </h5>
                          {selectedDestination === destination._id && destination.description && (
                            <p className="card-text text-white mb-2" style={{ 
                              fontSize: '0.7rem',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                              lineHeight: '1.1',
                              margin: '4px 0',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              padding: '4px 6px',
                              borderRadius: '4px'
                            }}>
                              {destination.description}
                            </p>
                          )}
                          <button 
                            onClick={() => handleViewDetails(destination._id)}
                            className="btn text-white btn-sm shadow-sm align-self-end" 
                            style={{ 
                              backgroundColor: '#7A1CAC',
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem'
                            }}
                          >
                            {selectedDestination === destination._id ? 
                              (language === 'en' ? 'Close' : 'बंद करें') :
                              (language === 'en' ? 'View Details' : 'विवरण देखें')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  {destinations.slice(4, 8).map((destination, index) => (
                    <div className="col-md-6 mb-4" key={index + 4}>
                      <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3" 
                        style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)', transform: 'translateY(-5px)' }}>
                        <img
                          src={`${config.baseUrl}${destination.image}`}
                          className="card-img-top img-fluid rounded-3"
                          alt={destination.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-overlay d-flex flex-column justify-content-end p-3 rounded-3">
                          <h5 className="card-title text-white mb-1" 
                            style={{ 
                              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
                              fontSize: '0.95rem',
                              fontWeight: '600'
                            }}>
                            {destination.name}
                          </h5>
                          {selectedDestination === destination._id && destination.description && (
                            <p className="card-text text-white mb-2" style={{ 
                              fontSize: '0.7rem',
                              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                              lineHeight: '1.1',
                              margin: '4px 0',
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              padding: '4px 6px',
                              borderRadius: '4px'
                            }}>
                              {destination.description}
                            </p>
                          )}
                          <button 
                            onClick={() => handleViewDetails(destination._id)}
                            className="btn text-white btn-sm shadow-sm align-self-end" 
                            style={{ 
                              backgroundColor: '#7A1CAC',
                              fontSize: '0.75rem',
                              padding: '0.25rem 0.5rem'
                            }}
                          >
                            {selectedDestination === destination._id ? 
                              (language === 'en' ? 'Close' : 'बंद करें') :
                              (language === 'en' ? 'View Details' : 'विवरण देखें')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-4">
            <button
              className="btn view"
              style={{
                borderRadius: '8px',
                border: '2px solid #6f42c1',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 'bold',
                width: '100px',
                fontFamily: 'Montserrat, sans-serif'
              }}
              onClick={() => navigate('/all-tourist')}
            >
              {language === 'en' ? 'View All' : 'सभी देखें'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDestination;