import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/footer';
import './tender.css';

const TenderComp = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${config.apiBaseUrl}/tenders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setTenders(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching tender data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Container className="office-details-container" style={{ 
        marginTop: '-15vh',
        position: 'relative',
        zIndex: 1,
        marginBottom: '15vh'
      }}>
        <div className="table-responsive" style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <Table hover className="custom-table text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reference No</th>
                <th>Closing Date</th>
                <th>Bid Opening Date</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender, index) => (
                <tr key={index}>
                  <td data-label="Name">{tender.name}</td>
                  <td data-label="Reference No">{tender.referenceNo}</td>
                  <td data-label="Closing Date">{new Date(tender.closingDate).toLocaleDateString()}</td>
                  <td data-label="Bid Opening Date">{new Date(tender.bidOpeningDate).toLocaleDateString()}</td>
                  <td data-label="PDF">
                    <Button
                      variant="primary"
                      size="sm"
                      href={`${config.baseUrl}${tender.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-button"
                    >
                      Download PDF
                    </Button>
                  </td>
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