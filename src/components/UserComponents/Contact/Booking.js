import React, { useState } from 'react';
import './Booking.css'; // External CSS for custom styling
import { Accordion, Card, Button } from 'react-bootstrap';

const Booking = () => {
  const [showPolicy, setShowPolicy] = useState(true);

  const handleClosePolicy = () => {
    setShowPolicy(false);
  };

  return (
    <div className="booking-policies-container">
      {showPolicy && (
        <div className="booking-policies-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>Booking Policies</h2>
            <Button variant="link" onClick={handleClosePolicy} className="close-button">
              <i className="bi bi-x-circle-fill"></i>
            </Button>
          </div>
          <div className="card-body">
            <ol>
              <li>Objectionable articles* (Items) are not allowed to be carried on the bus.</li>
              <li>Travelers under the influence of Alcohol/Intoxicating Drugs will not be allowed to travel in the bus.</li>
              <li>Travelers are requested to maintain the decorum.</li>
              <li>BSRTC will not be responsible for any kind of theft of the luggage carried by the passenger inside the bus with him/her.</li>
              <li>Any kind of misbehavior with a female passenger will not be tolerated and the passenger will be asked to leave the bus.</li>
              <li>Pets are not allowed.</li>
            </ol>
          </div>
        </div>
      )}

      <Accordion className="mt-3">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Cancellation Policy
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Details about the cancellation policy go here.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Luggage Policy
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Details about the luggage policy go here.</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Booking;
