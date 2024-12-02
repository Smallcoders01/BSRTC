import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Directory.css";
import Footer from '../Footer/footer';

const DirectoryComponent = ({ onDataLoaded }) => {
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const language = localStorage.getItem('language') || 'en'; // Get the selected language

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/phone-directory/${language}`, { timeout: 10000 })
      .then(response => {
        console.log('Fetched Data:', response.data); // Log the fetched data
        setDivisions(response.data);
        setSelectedDivision(response.data[0]);
        setLoading(false);
        onDataLoaded();
      })
      .catch(error => {
        console.error('Error fetching data', error);
        setError('Error fetching officer data');
        setLoading(false);
        onDataLoaded();
      });
  }, [onDataLoaded, language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Container className="mt-4 office-details-container">
        <nav className="office-nav">
          <ul>
            {divisions.map((division, index) => (
              <li
                key={index}
                className={`division ${selectedDivision && selectedDivision.name === division.name ? 'active' : ''}`}
                onClick={() => setSelectedDivision(division)}
              >
                <span className={selectedDivision && selectedDivision.name === division.name ? 'yellow-division' : ''}>
                  {division.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="table-responsive">
          {selectedDivision && selectedDivision.officers.length > 0 ? (
            <Table bordered hover className="custom-table text-center">
              <thead>
                <tr>
                  <th>{language === 'en' ? 'OFFICER NAME' : 'अधिकारी का नाम'}</th>
                  <th>{language === 'en' ? 'DESIGNATION' : 'पद'}</th>
                  <th>{language === 'en' ? 'OFFICE' : 'कार्यालय'}</th>
                  <th>{language === 'en' ? 'MOBILE NUMBER' : 'मोबाइल नंबर'}</th>
                  <th>{language === 'en' ? 'EMAIL ID' : 'ईमेल आईडी'}</th>
                </tr>
              </thead>
              <tbody>
                {selectedDivision.officers.map((officer, officerIndex) => (
                  <tr key={officerIndex}>
                    <td data-label={language === 'en' ? 'OFFICER NAME' : 'अधिकारी का नाम'}>
                      {officer.name || 'N/A'}
                    </td>
                    <td data-label={language === 'en' ? 'DESIGNATION' : 'पद'}>
                      {officer.designation || 'N/A'}
                    </td>
                    <td data-label={language === 'en' ? 'OFFICE' : 'कार्यालय'}>
                      {officer.office || 'N/A'}
                    </td>
                    <td data-label={language === 'en' ? 'MOBILE NUMBER' : 'मोबाइल नंबर'}>
                      {officer.phoneNumber || 'N/A'}
                    </td>
                    <td data-label={language === 'en' ? 'EMAIL ID' : 'ईमेल आईडी'}>
                      {officer.email || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>{language === 'en' ? 'No officers found for the selected division' : 'चयनित विभाग के लिए कोई अधिकारी नहीं मिला'}</div>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default DirectoryComponent;