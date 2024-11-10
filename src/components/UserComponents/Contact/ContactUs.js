import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import './HelplineNumbers.css';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const HelplineNumbers = ({ onDataLoaded }) => {
  const [mainContact, setMainContact] = useState({ email: '', phoneNumber1: '', phoneNumber2: '' });
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    // Update current language when localStorage changes
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('storage', handleLanguageChange);
    return () => window.removeEventListener('storage', handleLanguageChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `helplineData_${currentLanguage}`;
      console.log(`HelplineNumbers: Checking cache for ${currentLanguage}`);
      
      const cachedData = checkCache(cacheKey);
      if (cachedData) {
        console.log(`HelplineNumbers: Using cached data for ${currentLanguage}`);
        setMainContact(cachedData.mainContact);
        setDivisions(cachedData.divisions);
        setLoading(false);
        onDataLoaded();
        return;
      }

      console.log(`HelplineNumbers: Fetching fresh data for ${currentLanguage}`);
      try {
        const [contactResponse, divisionsResponse] = await Promise.all([
          axios.get(`${config.apiBaseUrl}/contact-info`),
          axios.get(`${config.apiBaseUrl}/divisions/${currentLanguage}`)
        ]);

        console.log('HelplineNumbers: Data fetched successfully');
        if (contactResponse.data.length > 0) {
          const contactInfo = contactResponse.data[0];
          const newMainContact = {
            email: contactInfo.email,
            phoneNumber1: contactInfo.phoneNumber1,
            phoneNumber2: contactInfo.phoneNumber2
          };
          setMainContact(newMainContact);
          setDivisions(divisionsResponse.data || []);
          cacheData(cacheKey, newMainContact, divisionsResponse.data || []);
        } else {
          setError('No contact information found');
        }
      } catch (error) {
        console.error('HelplineNumbers: Error fetching data', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
        onDataLoaded();
      }
    };

    fetchData();
  }, [onDataLoaded, currentLanguage]); // Added currentLanguage as dependency

  const checkCache = (cacheKey) => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return null;
  };

  const cacheData = (cacheKey, mainContact, divisions) => {
    const dataToCache = {
      data: { mainContact, divisions },
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
  };

  if (loading || error) {
    return null;
  }

  return (
    <div className="helpline-container">
      <div className="contact-bar d-flex justify-content-center align-items-center">
        <div className="contact-item">
          <i className="bi bi-telephone-fill"></i> {mainContact.phoneNumber1}, {mainContact.phoneNumber2}
        </div>
        <div className="contact-item">
          <i className="bi bi-envelope-fill"></i> {mainContact.email}
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center">
          {currentLanguage === 'en' ? 'BSRTC Helpline Number' : 'बीएसआरटीसी हेल्पलाइन नंबर'}
        </h2>
        <div className="row mt-4">
          {divisions.map((division, index) => (
            <div className="col-md-4" key={division._id || index}>
              <div className="division-card">
                <h4>{division.name}</h4>
                <p>{division.personInCharge}</p>
                <p>{division.phoneNumber}</p>
                <p>{division.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelplineNumbers;