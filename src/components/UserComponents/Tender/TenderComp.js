import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Directory/Directory.css"; // Import custom CSS for exact styling
import Footer from '../Footer/footer';

const TenderComp = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/tenders`)
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
      <Container className="mt-4 office-details-container">
        <h2 className="text-center mb-4">Tenders</h2>
        <div className="table-responsive">
          <Table bordered hover className="custom-table text-center">
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
                  <td>{tender.name}</td>
                  <td>{tender.referenceNo}</td>
                  <td>{new Date(tender.closingDate).toLocaleDateString()}</td>
                  <td>{new Date(tender.bidOpeningDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="primary"
                      href={`${config.baseUrl}/${tender.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
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