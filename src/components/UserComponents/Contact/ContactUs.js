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

  useEffect(() => {
    const fetchData = async () => {
      console.log('HelplineNumbers: Checking cache');
      const cachedData = checkCache();
      if (cachedData) {
        console.log('HelplineNumbers: Using cached data');
        setMainContact(cachedData.mainContact);
        setDivisions(cachedData.divisions);
        setLoading(false);
        onDataLoaded();
        return;
      }

      console.log('HelplineNumbers: Fetching fresh data');
      try {
        const [contactResponse, divisionsResponse] = await Promise.all([
          axios.get(`${config.apiBaseUrl}/contact-info`, { timeout: 10000 }),
          axios.get(`${config.apiBaseUrl}/divisions`, { timeout: 10000 })
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
          cacheData(newMainContact, divisionsResponse.data || []);
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
  }, [onDataLoaded]);

  const checkCache = () => {
    const cachedData = localStorage.getItem('helplineData');
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return null;
  };

  const cacheData = (mainContact, divisions) => {
    const dataToCache = {
      data: { mainContact, divisions },
      timestamp: Date.now()
    };
    localStorage.setItem('helplineData', JSON.stringify(dataToCache));
  };

  console.log('HelplineNumbers: Render cycle', { loading, error });

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
        <h2 className="text-center">BSRTC Helpline Number</h2>
        <div className="row mt-4">
          {divisions.map((division, index) => (
            <div className="col-md-4" key={index}>
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