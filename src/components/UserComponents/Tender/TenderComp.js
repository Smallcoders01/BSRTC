import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Directory/Directory.css"; // Import custom CSS for exact styling
import Footer from '../Footer/footer';

const TenderComp = () => {
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/phone-directory`)
      .then(response => {
        setDivisions(response.data);
        setSelectedDivision(response.data[0]); // Set the first division as the default selected division
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching officer data');
        setLoading(false);
      });
  }, []);

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
                <div className="yellow">
                  {division.name}
                </div>
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

export default TenderComp;
