import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { IoLanguage } from 'react-icons/io5';
import { toast } from 'react-toastify';
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
                maxWidth: '100%',
                display: 'block'
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
                <Link to="/news">
                  {language === 'en' ? 'News and Announcements' : 'समाचार और घोषणाएं'}
                </Link>
              </li>
              <li>
                <a href="https://bsrtc.apto.ai/open/raise_grievance" target="_blank" rel="noopener noreferrer">
                  {language === 'en' ? 'Raise Grievance' : 'शिकायत दर्ज करें'}
                </a>
              </li>
              <li>
                <a href="https://bsrtc.apto.ai/open/report_incidence" target="_blank" rel="noopener noreferrer">
                  {language === 'en' ? 'Raise Incidence' : 'घटना दर्ज करें'}
                </a>
              </li>
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
              <li><Link to="/cancellation-policy">{language === 'en' ? 'Cancellation Policy' : 'रद्दीकरण नीति'}</Link></li>
              <li><Link to="/booking-policy">{language === 'en' ? 'Booking Policy' : 'बुकिंग नीति'}</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column align-items-center">
            <h5 className="footer-title">
              {language === 'en' ? 'Social Media' : 'सोशल मीडिया'}
            </h5>
            <div className="social-icons">
              {/* Facebook */}
              <a href="https://www.facebook.com/BiharTransportDept" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/bihartransport" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a href="https://x.com/BiharTransport" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M23.643 4.937c-.835.37-1.73.617-2.67.724a4.655 4.655 0 0 0 2.034-2.573 9.29 9.29 0 0 1-2.922 1.116A4.634 4.634 0 0 0 16.616 3c-2.56 0-4.637 2.077-4.637 4.637 0 .364.04.72.117 1.063-3.86-.194-7.29-2.042-9.605-4.85a4.634 4.634 0 0 0-.626 2.32c0 1.604.817 3.017 2.063 3.843a4.617 4.617 0 0 1-2.095-.577v.058c0 2.236 1.585 4.096 3.688 4.52a4.646 4.646 0 0 1-2.085.079c.588 1.83 2.293 3.16 4.307 3.196a9.293 9.293 0 0 1-5.75 1.977c-.373 0-.738-.022-1.1-.065a13.086 13.086 0 0 0 7.057 2.066c8.487 0 13.14-7.034 13.14-13.14 0-.2 0-.398-.014-.594a9.42 9.42 0 0 0 2.317-2.4z"/>
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
    </div>
  );
};

export default Footer;
