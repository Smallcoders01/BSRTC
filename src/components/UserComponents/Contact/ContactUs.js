import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config'; // Ensure this path is correct
import './HelplineNumbers.css'; // Import the external CSS file

const HelplineNumbers = () => {
  const [mainContact, setMainContact] = useState({ email: '', phoneNumber1: '', phoneNumber2: '' });
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the main contact information
    axios.get(`${config.apiBaseUrl}/contact-info`)
      .then(response => {
        console.log('Contact Info Response:', response.data); // Debugging log
        if (response.data.length > 0) {
          const contactInfo = response.data[0];
          setMainContact({
            email: contactInfo.email,
            phoneNumber1: contactInfo.phoneNumber1,
            phoneNumber2: contactInfo.phoneNumber2
          });
        } else {
          setError('No contact information found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contact information:', error); // Debugging log
        setError('Error fetching contact information');
        setLoading(false);
      });

    // Fetch the division data
    axios.get(`${config.apiBaseUrl}/divisions`)
      .then(response => {
        console.log('Divisions Response:', response.data); // Debugging log
        setDivisions(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching divisions:', error); // Debugging log
        setError('Error fetching divisions');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="helpline-container">
      {/* Contact Details Section */}
      <div className="contact-bar d-flex justify-content-center align-items-center">
        <div className="contact-item">
          <i className="bi bi-telephone-fill"></i> {mainContact.phoneNumber1}, {mainContact.phoneNumber2}
        </div>
        <div className="contact-item">
          <i className="bi bi-envelope-fill"></i> {mainContact.email}
        </div>
      </div>

      {/* Helpline Numbers Section */}
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