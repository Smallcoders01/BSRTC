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
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('DirectoryComponent: Fetching data');
    axios.get(`${config.apiBaseUrl}/phone-directory`, { timeout: 10000 })
      .then(response => {
        console.log('DirectoryComponent: Data fetched successfully');
        setDivisions(response.data);
        setSelectedDivision(response.data[0]);
        setLoading(false);
        onDataLoaded();
      })
      .catch(error => {
        console.error('DirectoryComponent: Error fetching data', error);
        setError('Error fetching officer data');
        setLoading(false);
        onDataLoaded();
      });
  }, [onDataLoaded]);

  console.log('DirectoryComponent: Render cycle', { loading, error });

  if (loading || error) {
    return null;
  }

  console.log('DirectoryComponent: Rendering content');
  return (
    <>
      <Container className="mt-4 office-details-container">
        <nav className="office-nav">
          <ul>
            {divisions.map((division, index) => (
              <li
                key={index}
                className={`division ${selectedDivision && selectedDivision.name === division.name ? 'active' : ''} ${division.name === 'BSRTC Head Office' ? 'head-office' : ''}`}
                onClick={() => setSelectedDivision(division)}
              >
                {division.name === 'BSRTC Head Office' ? (
                  division.name
                ) : (
                  <div className={selectedDivision && selectedDivision.name === division.name ? 'yellow' : ''}>
                    {division.name}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="table-responsive">
          <Table bordered hover className="custom-table text-center">
            <thead>
              <tr>
                <th>OFFICER NAME</th>
                <th>DESIGNATION</th>
                <th>OFFICE</th>
                <th>MOBILE NUMBER</th>
                <th>EMAIL ID</th>
              </tr>
            </thead>
            <tbody>
              {selectedDivision && selectedDivision.officers.map((officer, officerIndex) => (
                <tr key={officerIndex}>
                  <td>{officer.name}</td>
                  <td>{officer.designation}</td>
                  <td>{officer.office}</td>
                  <td>{officer.phoneNumber}</td>
                  <td>{officer.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default DirectoryComponent;