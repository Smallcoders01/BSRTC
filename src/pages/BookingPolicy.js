import React from 'react';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import './BookingPolicy.css';

const BookingPolicy = () => {
  // Static introduction content
  const introContent = {
    en: {
      title: "Booking Policy",
      intro: ``
    },
    hi: {
      title: "बुकिंग नीति",
      intro: ``
    }
  };

  const language = localStorage.getItem('language') || 'en';

  const contentStyle = {
    paddingLeft: '75px',
    paddingRight: '75px',
    textAlign: 'left'
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '30px',
    paddingLeft: '75px',
    textAlign: 'left'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#333'
  };

  return (
    <>
      <div>
        <Banner />
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-4" style={headingStyle}>
                {introContent[language].title}
              </h1>

              <div style={contentStyle}>
                {/* Static Introduction */}
                <div className="mb-5">
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#444',
                    marginBottom: '30px'
                  }}>
                    {/* Removed the introduction text */}
                  </p>
                </div>

                {/* Booking Policy Details */}
                <div className="booking-content">
                  <ol style={{ fontSize: '16px', lineHeight: '1.8', color: '#444' }}>
                    <li>
                      <div style={titleStyle}>Eligibility for Booking</div>
                      <p>BSRTC bus tickets can be booked by individuals of all age groups through the official BSRTC website or mobile app. A valid identification may be required for booking and boarding.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Booking Methods</div>
                      <p>Tickets can be booked online through the BSRTC official website or mobile app. Physical ticket booking is available at designated BSRTC counters and authorized travel agents.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Ticket Types</div>
                      <p>BSRTC offers various ticket types including economy, deluxe, and premium class, with different price points and amenities.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Booking Confirmation</div>
                      <p>Upon successful payment, a booking confirmation will be sent to your registered email and mobile number. You can also download the e-ticket from the "My Bookings" section on the website.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Payment Options</div>
                      <p>Accepted payment methods include credit/debit cards, net banking, UPI, and mobile wallets. Cash payment is only available at physical counters.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Ticket Changes and Modifications</div>
                      <p>Changes to passenger details or travel date are not permitted after booking. To modify your travel plans, you must cancel your existing ticket and book a new one.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Cancellation Policy</div>
                      <p>1 day before departure: 85% refund. 12 hours to 1 day before departure: 80% refund. 4 hours to 12 hours before departure: 50% refund. Within 4 hours of departure: No refund. Refunds will be processed back to the original payment method and may take a few business days.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>No-Show Policy</div>
                      <p>If you do not board the bus without prior cancellation, the ticket amount will not be refunded, and you will be considered a "no-show."</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Booking Limitations</div>
                      <p>There is no maximum limit on the number of tickets an individual can book. However, group bookings may require prior authorization.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Refund Policy</div>
                      <p>Refunds for cancelled tickets will be processed according to the cancellation policy. Any service fees or applicable taxes may be non-refundable.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Booking Assistance</div>
                      <p>If you need help while booking, you can contact BSRTC customer support through the "Contact Us" section on the website or app.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Child Policy</div>
                      <p>Children under 5 years can travel free of charge when accompanied by an adult and without occupying a separate seat. For children over 5 years, a full ticket must be booked.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Identification Requirements</div>
                      <p>Passengers must present a valid government-issued ID at the time of boarding. The ID should match the name on the ticket.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Seat Selection</div>
                      <p>You can select your preferred seat during the booking process. Seats are allocated based on availability and selected class type.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Travel Documents</div>
                      <p>Carry a printed or digital version of your ticket, along with a valid ID, for verification at the time of boarding.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Special Requests</div>
                      <p>Special requests, such as assistance for senior citizens or differently-abled passengers, can be made during the booking process or by contacting customer support in advance.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Travel Insurance</div>
                      <p>Travel insurance is not provided by BSRTC. Passengers are advised to obtain personal travel insurance if needed.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Disruptions and Cancellations by BSRTC</div>
                      <p>BSRTC reserves the right to cancel or reschedule buses due to unforeseen circumstances such as weather conditions, technical issues, or other emergencies. In such cases, passengers will be notified and refunds will be processed as per the policy.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Code of Conduct</div>
                      <p>Passengers are expected to maintain decorum and adhere to BSRTC's code of conduct during travel. Disruptive behavior can result in fines or expulsion from the bus.</p>
                    </li>
                    <li>
                      <div style={titleStyle}>Privacy and Security</div>
                      <p>BSRTC prioritizes the privacy and security of passenger data. All booking transactions are encrypted and handled securely through reliable payment gateways.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPolicy;