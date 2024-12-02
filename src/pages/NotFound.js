import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/UserComponents/Banner';
import './NotFound.css';

const NotFound = () => {
  return (
    <div>
      <Banner />
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-message">
            Oops! The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
          <div className="error-actions">
            <Link to="/" className="home-button">
              <i className="bi bi-house-door-fill me-2"></i>
              Back to Home
            </Link>
            <Link to="/contact" className="contact-button">
              <i className="bi bi-envelope-fill me-2"></i>
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;