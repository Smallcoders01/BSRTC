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

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/tourist-destinations`)
      .then(response => {
        setDestinations(response.data.slice(0, 4));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-5 border-secondary rounded-4 p-4 shadow-lg bg-light" style={{ width: '80%' }}>
      <div className="row justify-content-center">
        <div className="col-lg-11 col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-4 popFLex">
            <div>
              <h2 className="fw-bold">
                {language === 'en' ? 'Tourist Destinations' : 'पर्यटक स्थल'}
              </h2>
              <p className="text-muted">
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
                  <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3">
                    <img
                      src={`${config.baseUrl}${destination.image}`}
                      className="card-img-top img-fluid rounded-3"
                      alt={destination.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-overlay d-flex flex-column justify-content-end p-3 rounded-3">
                      <h5 className="card-title text-white">{destination.name}</h5>
                      <button 
                        onClick={() => {
                          console.log('Book Now clicked for:', destination.name);
                          onBookNow(destination.name);
                        }}
                        className="btn text-white btn-sm shadow-sm" 
                        style={{ backgroundColor: '#7A1CAC' }}
                      >
                        {language === 'en' ? 'Book Now' : 'अभी बुक करें'}
                      </button>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="row grids">
              <div className="col-md-6 mb-4 grid-child">
                <div
                  className="card text-white p-4 h-100 border border-secondary rounded-3 shadow-sm"
                  style={{
                    backgroundColor: '#6B4190',
                    padding: '20px',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    lineHeight: '30px',
                    color: 'white',
                  }}
                >
                  <h3 className="fw-bold biharpara">
                    {language === 'en' ? 'Discover Bihar: A Treasure Trove of History and Culture' : 'बिहार की खोज करें: इतिहास और संस्कृति का खजाना'}
                  </h3>
                  <p>
                    {language === 'en'
                      ? 'Bihar is home to numerous architectural wonders, from the ancient stupas and monasteries to the grand forts and palaces. The ruins of Nalanda University, the Ashokan Pillar in Vaishali, and the Rajgir hills\' ancient caves offer glimpses into the state\'s glorious past. The Golghar in Patna and the Barabar Caves near Gaya are also significant attractions.'
                      : 'बिहार कई वास्तुशिल्प चमत्कारों का घर है, प्राचीन स्तूपों और मठों से लेकर भव्य किलों और महलों तक। नालंदा विश्वविद्यालय के खंडहर, वैशाली में अशोक स्तंभ, और राजगीर की पहाड़ियों की प्राचीन गुफाएं राज्य के गौरवशाली अतीत की झलक पेश करती हैं। पटना में गोलघर और गया के पास बाराबर गुफाएं भी महत्वपूर्ण आकर्षण हैं।'}
                  </p>
                </div>
              </div>

              <div className="col-md-6 grid-child">
                <div className="row">
                  {destinations.map((destination, index) => (
                    <div className="col-sm-6 mb-4" key={index}>
                      <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3">
                        <img
                          src={`${config.baseUrl}${destination.image}`}
                          className="card-img-top img-fluid rounded-3"
                          alt={destination.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="card-overlay d-flex justify-content-between align-items-end p-3 rounded-3">
                          <h5 className="card-title text-white">{destination.name}</h5>
                          <button 
                            onClick={() => {
                              console.log('Book Now clicked for:', destination.name);
                              onBookNow(destination.name);
                            }}
                            className="btn text-white btn-sm shadow-sm" 
                            style={{ backgroundColor: '#7A1CAC' }}
                          >
                            {language === 'en' ? 'Book Now' : 'अभी बुक करें'}
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