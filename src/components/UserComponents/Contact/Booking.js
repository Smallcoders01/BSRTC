import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import './Booking.css';

const Booking = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSections, setOpenSections] = useState({});
  const [showAll, setShowAll] = useState(false);
  const language = localStorage.getItem('language') || 'en'; // Get the selected language

  useEffect(() => {
    fetchPolicies();
  }, [language]); // Re-fetch policies when language changes

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/policies`, {
        params: { lang: language } // Ensure lang is passed as a query parameter
      });
      console.log('Fetched policies:', response.data); // Debugging: log the fetched data
      setPolicies(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching policies:', err);
      setError('Failed to load policies. Please try again later.');
      setLoading(false);
    }
  };

  const toggleAccordion = (policyId) => {
    setOpenSections(prevState => ({
      ...prevState,
      [policyId]: !prevState[policyId]
    }));
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  if (loading) return <div>Loading policies...</div>;
  if (error) return <div>{error}</div>;

  const displayedPolicies = showAll ? policies : policies.slice(0, 2);

  return (
    <div className="booking-policies-container">
      <h2 className="text-center">
        {language === 'en' ? 'Policies' : 'नीतियाँ'}
      </h2>

      {displayedPolicies.map(policy => (
        <div key={policy._id} className="policy-box"> {/* Ensure _id is unique */}
          <h3>{policy.name}</h3>
          <div dangerouslySetInnerHTML={{ __html: policy.content }} />
          {policy.details && (
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(policy._id)}
              >
                <span>{language === 'en' ? 'View Details' : 'विवरण देखें'}</span>
                <span>{openSections[policy._id] ? '−' : '+'}</span>
              </div>
              {openSections[policy._id] && (
                <div className="accordion-content">
                  <div dangerouslySetInnerHTML={{ __html: policy.details }} />
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {policies.length > 2 && (
        <div className="accordion-item">
          <div className="accordion-header" onClick={toggleShowAll}>
            <span>{showAll ? (language === 'en' ? 'Show Less' : 'कम दिखाएं') : (language === 'en' ? 'Show More' : 'और दिखाएं')}</span>
            <span>{showAll ? '−' : '+'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;