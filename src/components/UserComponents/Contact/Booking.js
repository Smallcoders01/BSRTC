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
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    // Listen for language changes in localStorage
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleLanguageChange);

    // Initial fetch
    fetchPolicies();

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, [currentLanguage]); // Depend on currentLanguage instead of language

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiBaseUrl}/policies/${currentLanguage}`);
      console.log('Fetched policies:', response.data);
      setPolicies(response.data);
    } catch (err) {
      console.error('Error fetching policies:', err);
      setError(currentLanguage === 'en' 
        ? 'Failed to load policies. Please try again later.'
        : 'नीतियां लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।');
    } finally {
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

  if (loading) return (
    <div className="loading-message">
      {currentLanguage === 'en' ? 'Loading policies...' : 'नीतियां लोड हो रही हैं...'}
    </div>
  );

  if (error) return (
    <div className="error-message">
      {error}
    </div>
  );

  const displayedPolicies = showAll ? policies : policies.slice(0, 2);

  return (
    <div className="booking-policies-container">
      <h2 className="text-center">
        {currentLanguage === 'en' ? 'Policies' : 'नीतियाँ'}
      </h2>

      {displayedPolicies.map(policy => (
        <div key={policy._id || policy.id} className="policy-box">
          <h3>{policy.name}</h3>
          <div dangerouslySetInnerHTML={{ __html: policy.content }} />
          {policy.details && (
            <div className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(policy._id || policy.id)}
              >
                <span>
                  {currentLanguage === 'en' ? 'View Details' : 'विवरण देखें'}
                </span>
                <span>{openSections[policy._id || policy.id] ? '−' : '+'}</span>
              </div>
              {openSections[policy._id || policy.id] && (
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
            <span>
              {showAll 
                ? (currentLanguage === 'en' ? 'Show Less' : 'कम दिखाएं') 
                : (currentLanguage === 'en' ? 'Show More' : 'और दिखाएं')}
            </span>
            <span>{showAll ? '−' : '+'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;