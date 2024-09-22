import React, { useState } from 'react';
import './Booking.css'; // Add external CSS for custom styles

const Booking = () => {
  // Manage the open/close state of each accordion section
  const [isOpen, setIsOpen] = useState({
    cancellationPolicy: false,
    luggagePolicy: false,
  });

  // Toggle function to expand/collapse accordion sections
  const toggleAccordion = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="booking-policies-container ">
      <h2 className="mb-4">Booking Policies</h2>

      {/* Policy list */}
      <div className="policy-box">
        <ul>
          <li>1) Objectionable articles* (Items) are not allowed to be carried on the bus.</li>
          <li>2) Travelers under the influence of Alcohol/Intoxicating Drugs will not be allowed to travel in the bus.</li>
          <li>3) Travelers are requested to maintain the decorum.</li>
          <li>4) BSRTC will not be responsible for any kind of theft of the luggage carried by the passenger inside the bus with him/her.</li>
          <li>5) Any kind of misbehavior with a female passenger will not be tolerated and the passenger will be asked to leave the bus.</li>
          <li>6) Pets are not allowed.</li>
        </ul>
      </div>

      {/* Cancellation Policy Accordion */}
      <div className="accordion-item">
        <div
          className="accordion-header"
          onClick={() => toggleAccordion('cancellationPolicy')}
        >
          <span>Cancellation Policy</span>
          <span>{isOpen.cancellationPolicy ? 'x' : '+'}</span>
        </div>
        {isOpen.cancellationPolicy && (
          <div className="accordion-content">
            <p>Here are the details of the cancellation policy...</p>
          </div>
        )}
      </div>

      {/* Luggage Policy Accordion */}
      <div className="accordion-item">
        <div
          className="accordion-header"
          onClick={() => toggleAccordion('luggagePolicy')}
        >
          <span>Luggage Policy</span>
          <span>{isOpen.luggagePolicy ? 'x' : '+'}</span>
        </div>
        {isOpen.luggagePolicy && (
          <div className="accordion-content">
            <p>Here are the details of the luggage policy...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
