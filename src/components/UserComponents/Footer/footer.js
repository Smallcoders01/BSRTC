import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { IoLanguage } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../img/logo.png';
import './Footer.css';

const Footer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload();
  };

  const handleMyAccountClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/profile');
      window.scrollTo(0, 0);
    } else {
      toast.info(language === 'en' ? 'Please login to access your account' : 'अपने खाते तक पहुंचने के लिए लॉगिन करें', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleMyBookingClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/my-booking');
      window.scrollTo(0, 0);
    } else {
      toast.info(language === 'en' ? 'Please login to view your bookings' : 'अपनी बुकिंग देखने के लिए लॉगिन करें', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
              style={{
                width: '180px',
                height: 'auto',
                maxWidth: '100%'
              }}
            />
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <ul className="list-unstyled footer-list">
              <li>
                <Link to="/" className="footer-title-link">
                  {language === 'en' ? 'Home' : 'होम'}
                </Link>
              </li>
              <li><Link to="/about">{language === 'en' ? 'About Us' : 'हमारे बारे में'}</Link></li>
              <li><Link to="/gallery">{language === 'en' ? 'Gallery' : 'गैलरी'}</Link></li>
              <li><Link to="/tender">{language === 'en' ? 'Tender' : 'टेंडर'}</Link></li>
              <li><Link to="/all-routes">{language === 'en' ? 'Popular Routes' : 'लोकप्रिय मार्ग'}</Link></li>
              <li><Link to="/all-tourist">{language === 'en' ? 'Tourist Destinations' : 'पर्यटन स्थल'}</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <ul className="list-unstyled footer-list">
              <li>
                <button 
                  onClick={handleMyAccountClick} 
                  className="footer-button"
                >
                  {language === 'en' ? 'My Account' : 'मेरा खाता'}
                </button>
              </li>
              <li>
                <button 
                  onClick={handleMyBookingClick}
                  className="footer-button"
                >
                  {language === 'en' ? 'My Booking' : 'मेरी बुकिंग'}
                </button>
              </li>
              <li><Link to="/pnr-status">{language === 'en' ? 'PNR Status' : 'पीएनआर स्थिति'}</Link></li>
              <li><Link to="/grievance">{language === 'en' ? 'Raise Grievance' : 'शिकायत दर्ज करें'}</Link></li>
              <li><Link to="/incidence">{language === 'en' ? 'Raise Incidence' : 'घटना दर्ज करें'}</Link></li>
              <li><Link to="/contact">{language === 'en' ? 'Contact Us' : 'संपर्क करें'}</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <ul className="list-unstyled footer-list">
              <li>
                <Link to="/faq" className="footer-title-link">
                  {language === 'en' ? 'FAQ' : 'सामान्य प्रश्न'}
                </Link>
              </li>
              <li><Link to="/privacy">{language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</Link></li>
              <li><Link to="/terms">{language === 'en' ? 'Terms & Condition' : 'नियम और शर्तें'}</Link></li>
              <li><Link to="/directory">{language === 'en' ? 'Directory' : 'निर्देशिका'}</Link></li>
              <li><Link to="/cancellation">{language === 'en' ? 'Cancellation' : 'रद्दीकरण'}</Link></li>
              <li><Link to="/refund">{language === 'en' ? 'Refund Rules and Claims' : 'धनवापसी नियम और दावे'}</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column align-items-center">
            <h5 className="footer-title">
              {language === 'en' ? 'Social Media' : 'सोशल मीडिया'}
            </h5>
            <div className="social-icons">
              {/* Facebook */}
              <a href="https://facebook.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="youtube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
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
      <ToastContainer />
    </div>
  );
};

export default Footer;
