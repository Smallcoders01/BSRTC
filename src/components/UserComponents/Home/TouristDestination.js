import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config'; // Adjust the path to the correct location of your config file
import '../../UserComponents/Home/popular.css';

const TouristDestination = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the tourist destinations from the backend API
    axios.get(`${config.apiBaseUrl}/tourist-destinations`)
      .then(response => {
        setDestinations(response.data.slice(0, 4)); // Limit to 4 destinations
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching tourist destinations');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-5 border-secondary rounded-4 p-4 shadow-lg bg-light" style={{ width: '80%' }}>
      <div className="row justify-content-center">
        <div className="col-lg-11 col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-4 popFLex">
            <div>
              <h2 className="fw-bold">Tourist Destinations</h2>
              <p className="text-muted">
                Planning to explore Bihar this season? Whether you're heading home or off on an adventure, we have the travel resources to get you to your destination.
              </p>
            </div>
            <button
              className="btn view"
              style={{
                borderRadius: '8px',
                border: '2px solid #6f42c1',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 'bold',
                width: '100px',
                marginLeft: '20px'
              }}
              onClick={() => navigate('/all-tourist')}
            >
              View All
            </button>
          </div>

          <div className="row grids">
            {/* Left column */}
            <div className="col-md-6 mb-4 grid-child">
              <div
                className="card text-white p-4 h-100 border border-secondary rounded-3 shadow-sm"
                style={{
                  backgroundColor: '#6B4190',
                  padding: '20px',
                  fontSize: '14px',
                  letterSpacing: '1px',
                  lineHeight:'30px',
                  color: 'white',
                }}
              >
                <h3 className="fw-bold biharpara">Discover Bihar: A Treasure Trove of History and Culture</h3>
                <p>
                  Bihar is home to numerous architectural wonders, from the ancient stupas and monasteries to the grand forts and palaces. The ruins of Nalanda University, the Ashokan Pillar in Vaishali, and the Rajgir hills' ancient caves offer glimpses into the state's glorious past. The Golghar in Patna and the Barabar Caves near Gaya are also significant attractions.
                </p>
              </div>
            </div>

            {/* Right column with images */}
            <div className="col-md-6 grid-child">
              <div className="row">
                {destinations.map((destination, index) => (
                  <div className="col-sm-6 mb-4" key={index}>
                    <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3">
                      <img
                        src={`${config.baseUrl}${destination.image}`}
                        className="card-img-top img-fluid rounded-3"
                        alt={destination.name}
                        style={{ height: '200px', objectFit: 'cover' }} // Adjusted height
                      />
                      <div className="card-overlay d-flex justify-content-between align-items-end p-3 rounded-3">
                        <h5 className="card-title text-white">{destination.name}</h5>
                        <a href="#" className="btn text-white btn-sm shadow-sm" style={{ backgroundColor: '#7A1CAC' }}>
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TouristDestination;