import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import './HelplineNumbers.css';

const HelplineNumbers = ({ onDataLoaded }) => {
  const [mainContact, setMainContact] = useState({ email: '', phoneNumber1: '', phoneNumber2: '' });
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('HelplineNumbers: Fetching data');
    Promise.all([
      axios.get(`${config.apiBaseUrl}/contact-info`, { timeout: 10000 }),
      axios.get(`${config.apiBaseUrl}/divisions`, { timeout: 10000 })
    ])
      .then(([contactResponse, divisionsResponse]) => {
        console.log('HelplineNumbers: Data fetched successfully');
        if (contactResponse.data.length > 0) {
          const contactInfo = contactResponse.data[0];
          setMainContact({
            email: contactInfo.email,
            phoneNumber1: contactInfo.phoneNumber1,
            phoneNumber2: contactInfo.phoneNumber2
          });
        } else {
          setError('No contact information found');
        }
        setDivisions(divisionsResponse.data || []);
        setLoading(false);
        onDataLoaded();
      })
      .catch(error => {
        console.error('HelplineNumbers: Error fetching data', error);
        setError('Error fetching data');
        setLoading(false);
        onDataLoaded();
      });
  }, [onDataLoaded]);

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