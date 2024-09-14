import React from 'react';
import '../Footer/Footer.css'; // External CSS for custom styles
import logo from '../../../img/logo.png'
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 footer-logo">
            <img
              src={logo} 
              alt="Government Logo"
              className="footer-logo-img"
            />
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Know More About</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">Letters & Circulars</a></li>
              <li><a href="#">Luggage Rates</a></li>
              <li><a href="#">Reservation Terms</a></li>
              <li><a href="#">Refund Rules and Claims</a></li>
              <li><a href="#">Booking Counters</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">About Us</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">Terms of Services</a></li>
              <li><a href="#">Bus Services</a></li>
              <li><a href="#">User Agreement</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Passenger Safety</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">General Info</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">PNR Status</a></li>
              <li><a href="#">Tender</a></li>
              <li><a href="#">My Bookings</a></li>
              <li><a href="#">Cancellation</a></li>
              <li><a href="#">My Account</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Company</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Teams</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
