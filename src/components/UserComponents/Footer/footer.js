import React, { useState } from 'react';
import '../Footer/Footer.css'; // External CSS for custom styles
import logo from '../../../img/logo.png';
import { IoLanguage } from 'react-icons/io5'; // Add this import for language icon

const Footer = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload(); // Reload to apply language changes
  };

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
            <h5 className="footer-title">{language === 'en' ? 'Know More About' : 'के बारे में अधिक जानें'}</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">{language === 'en' ? 'Letters & Circulars' : 'पत्र और परिपत्र'}</a></li>
              <li><a href="#">{language === 'en' ? 'Luggage Rates' : 'सामान दरें'}</a></li>
              <li><a href="#">{language === 'en' ? 'Reservation Terms' : 'आरक्षण शर्तें'}</a></li>
              <li><a href="#">{language === 'en' ? 'Refund Rules and Claims' : 'वापसी नियम और दावे'}</a></li>
              <li><a href="#">{language === 'en' ? 'Booking Counters' : 'बुकिंग काउंटर'}</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">{language === 'en' ? 'About Us' : 'हमारे बारे में'}</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">{language === 'en' ? 'Terms of Services' : 'सेवा की शर्तें'}</a></li>
              <li><a href="#">{language === 'en' ? 'Bus Services' : 'बस सेवाएं'}</a></li>
              <li><a href="#">{language === 'en' ? 'User Agreement' : 'उपयोगकर्ता समझौता'}</a></li>
              <li><a href="#">{language === 'en' ? 'Privacy' : 'गोपनीयता'}</a></li>
              <li><a href="#">{language === 'en' ? 'Passenger Safety' : 'यात्री सुरक्षा'}</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">{language === 'en' ? 'General Info' : 'सामान्य जानकारी'}</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">{language === 'en' ? 'PNR Status' : 'पीएनआर स्थिति'}</a></li>
              <li><a href="/tender">{language === 'en' ? 'Tender' : 'निविदा'}</a></li>
              <li><a href="#">{language === 'en' ? 'My Bookings' : 'मेरी बुकिंग'}</a></li>
              <li><a href="#">{language === 'en' ? 'Cancellation' : 'रद्द करना'}</a></li>
              <li><a href="#">{language === 'en' ? 'My Account' : 'मेरा खाता'}</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">{language === 'en' ? 'Company' : 'कंपनी'}</h5>
            <ul className="list-unstyled footer-list">
              <li><a href="#">{language === 'en' ? 'About Us' : 'हमारे बारे में'}</a></li>
              <li><a href="#">{language === 'en' ? 'Careers' : 'करियर'}</a></li>
              <li><a href="#">{language === 'en' ? 'FAQs' : 'सामान्य प्रश्न'}</a></li>
              <li><a href="#">{language === 'en' ? 'Teams' : 'टीम'}</a></li>
              <li><a href="#">{language === 'en' ? 'Contact Us' : 'संपर्क करें'}</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-title">{language === 'en' ? 'Language' : 'भाषा'}</h5>
            <div className="language-selector" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <IoLanguage size={20} color="#666" />
              <div style={{
                display: 'flex',
                background: '#f0f0f0',
                borderRadius: '20px',
                padding: '4px',
                width: 'fit-content',
                cursor: 'pointer'
              }}>
                <button
                  onClick={() => handleLanguageChange('en')}
                  style={{
                    padding: '4px 12px',
                    border: 'none',
                    borderRadius: '16px',
                    background: language === 'en' ? '#9c27b0' : 'transparent',
                    color: language === 'en' ? 'white' : '#666',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ENG
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  style={{
                    padding: '4px 12px',
                    border: 'none',
                    borderRadius: '16px',
                    background: language === 'hi' ? '#9c27b0' : 'transparent',
                    color: language === 'hi' ? 'white' : '#666',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
