import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Directory.css";
import Footer from '../Footer/footer';

const DirectoryComponent = ({ onDataLoaded }) => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/phone-directory/${language}`, { timeout: 10000 })
      .then(response => {
        const allOfficers = response.data.reduce((acc, division) => {
          return [...acc, ...division.officers];
        }, []);
        setOfficers(allOfficers);
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
      <Container className="mt-2 office-details-container">
        <div className="table-responsive">
          {officers.length > 0 ? (
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
                {officers.map((officer, index) => (
                  <tr key={index}>
                    <td data-label={language === 'en' ? 'OFFICER NAME' : 'अधिकरी का नाम'}>
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
            <div>{language === 'en' ? 'No officers found' : 'कोई अधिकारी नहीं मिला'}</div>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default DirectoryComponent;