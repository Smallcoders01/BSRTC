import React, { useState, useEffect } from 'react';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import axios from 'axios';
import config from '../config';
import './BookingPolicy.css';

const BookingPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/booking-policy`);
      setPolicies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching policies:', error);
      setLoading(false);
    }
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '30px',
    paddingLeft: '75px',
    textAlign: 'left',
    color: '#1a237e',
    borderBottom: '3px solid #1976d2',
    paddingBottom: '10px',
    width: 'fit-content'
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: '15px',
    padding: '10px 0',
    borderLeft: '4px solid #1976d2',
    paddingLeft: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '0 4px 4px 0'
  };

  const contentStyle = {
    padding: '20px 75px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <>
      <div>
        <Banner />
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-4" style={headingStyle}>
                {language === 'en' ? "Booking Policy" : "बुकिंग नीति"}
              </h1>

              <div style={contentStyle}>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <>
                    {policies.map((policy, index) => (
                      <div key={policy._id || index} className="policy-section mb-4">
                        <h2 style={sectionTitleStyle}>
                          {language === 'en' ? policy.titleEn : policy.titleHi}
                        </h2>
                        <div className="policy-content">
                          <p style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#444',
                            whiteSpace: 'pre-line'
                          }}>
                            {language === 'en' ? policy.contentEn : policy.contentHi}
                          </p>
                        </div>
                      </div>
                    ))}

                    {policies.length === 0 && (
                      <div className="text-center py-4">
                        <p>No booking policies found.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPolicy;