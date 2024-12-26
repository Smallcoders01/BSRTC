import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import './HelplineNumbers.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const RATE_LIMIT = 5; // Max 5 submissions per minute
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

const HelplineNumbers = ({ onDataLoaded }) => {
  const [mainContact, setMainContact] = useState({ email: '', phoneNumber1: '', phoneNumber2: '' });
  const [divisions, setDivisions] = useState([]);
  const [depots, setDepots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [submissionCount, setSubmissionCount] = useState(0);
  const [firstSubmitTime, setFirstSubmitTime] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    // Update current language when localStorage changes
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en';
      setCurrentLanguage(newLanguage);
    };

    window.addEventListener('storage', handleLanguageChange);
    return () => window.removeEventListener('storage', handleLanguageChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `helplineData_${currentLanguage}`;
      console.log(`HelplineNumbers: Checking cache for ${currentLanguage}`);
      
      const cachedData = checkCache(cacheKey);
      if (cachedData) {
        console.log(`HelplineNumbers: Using cached data for ${currentLanguage}`);
        setMainContact(cachedData.mainContact);
        setDivisions(cachedData.divisions);
        setDepots(cachedData.depots);
        setLoading(false);
        onDataLoaded();
        return;
      }

      console.log(`HelplineNumbers: Fetching fresh data for ${currentLanguage}`);
      try {
        const [contactResponse, divisionsResponse, depotsResponse] = await Promise.all([
          axios.get(`${config.apiBaseUrl}/contact-info`),
          axios.get(`${config.apiBaseUrl}/divisions/${currentLanguage}`),
          axios.get(`${config.apiBaseUrl}/depots/${currentLanguage}`)
        ]);

        console.log('Depots Response:', depotsResponse.data);

        if (contactResponse.data.length > 0) {
          const contactInfo = contactResponse.data[0];
          const newMainContact = {
            email: contactInfo.email,
            phoneNumber1: contactInfo.phoneNumber1,
            phoneNumber2: contactInfo.phoneNumber2
          };
          setMainContact(newMainContact);
          setDivisions(divisionsResponse.data || []);
          setDepots(depotsResponse.data || []);
          cacheData(cacheKey, newMainContact, divisionsResponse.data || [], depotsResponse.data || []);
        } else {
          setError('No contact information found');
        }
      } catch (error) {
        console.error('HelplineNumbers: Error fetching data', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
        onDataLoaded();
      }
    };

    fetchData();
  }, [onDataLoaded, currentLanguage]); // Added currentLanguage as dependency

  const checkCache = (cacheKey) => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return null;
  };

  const cacheData = (cacheKey, mainContact, divisions, depots) => {
    const dataToCache = {
      data: { mainContact, divisions, depots },
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = Date.now();

    // If first submit time is not set, set it
    if (!firstSubmitTime) {
      setFirstSubmitTime(currentTime);
    }

    // Check if the time window (1 minute) has passed
    if (currentTime - firstSubmitTime > TIME_WINDOW) {
      // Reset counter if more than 1 minute has passed
      setFirstSubmitTime(currentTime);
      setSubmissionCount(1);
    } else {
      setSubmissionCount(submissionCount + 1);
    }

    // If user exceeded submission limit, show a message
    if (submissionCount >= RATE_LIMIT) {
      setIsRateLimited(true);
      toast.error('Too many submissions. Please try again later.');
      return;
    }

    setSubmitStatus('sending');
    
    // Create payload object according to StaticForms requirements
    const payload = {
      accessKey: config.staticFormsKey,
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      subject: 'New Contact Form Submission'
    };
    
    try {
      const response = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const responseData = await response.json();
      
      if (response.ok && responseData.success) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        toast.success('Message sent successfully!');
        setTimeout(() => setSubmitStatus(''), 3000);
        localStorage.setItem(
          `rateLimitData`,
          JSON.stringify({
            count: submissionCount + 1,
            firstSubmitTime: currentTime
          })
        );
      } else {
        console.error('StaticForms error:', responseData);
        throw new Error(responseData.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      toast.error('Submission failed. Please try again.');
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  if (loading || error) {
    return null;
  }

  return (
    <div className="helpline-container">
      <div className="contact-bar d-flex justify-content-center align-items-center">
        <div className="contact-item">
          <i className="bi bi-telephone-fill"></i> {mainContact.phoneNumber1}, {mainContact.phoneNumber2}
        </div>
        <div className="contact-item">
          <i className="bi bi-envelope-fill"></i> {mainContact.email}
        </div>
      </div>

      <div className="container mt-5">
        <div className="helpline-card">
          <h2 className="text-center">
            {currentLanguage === 'en' ? 'BSRTC Division Helpline Numbers' : 'बीएसआरटीसी डिवीजन हेल्पलाइन नंबर'}
          </h2>
          <div className="divisions-grid">
            {divisions && divisions.length > 0 ? (
              divisions.map((division, index) => (
                <div className="division-item" key={division._id || index}>
                  <h4>{division.name}</h4>
                  <p>{division.personInCharge}</p>
                  <p className="contact-info">
                    <FaPhone className="contact-icon" />
                    {division.phoneNumber}
                  </p>
                  <p className="contact-info">
                    <FaEnvelope className="contact-icon" />
                    {division.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center">No divisions found</p>
            )}
          </div>
        </div>

        <div className="helpline-card mt-5">
          <h2 className="text-center">
            {currentLanguage === 'en' ? 'BSRTC Depot Helpline Numbers' : 'बीएसआरटीसी डिपो हेल्पलाइन नंबर'}
          </h2>
          <div className="divisions-grid">
            {depots && depots.length > 0 ? (
              depots.map((depot, index) => (
                <div className="division-item" key={depot._id || index}>
                  <h4>{currentLanguage === 'hi' ? depot.nameHi : depot.nameEn}</h4>
                  <p>{currentLanguage === 'hi' ? depot.personInChargeHi : depot.personInChargeEn}</p>
                  <p className="contact-info">
                    <FaPhone className="contact-icon" />
                    {depot.phoneNumber}
                  </p>
                  <p className="contact-info">
                    <FaEnvelope className="contact-icon" />
                    {depot.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center">No depots found</p>
            )}
          </div>
        </div>
      </div>

      <div className="contact-form-container">
        <h2 className="text-center">
          {currentLanguage === 'en' ? 'Send us a Message' : 'हमें संदेश भेजें'}
        </h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'en' ? 'Your Name' : 'आपका नाम'}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'en' ? 'Your Phone' : 'आपका फोन'}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'en' ? 'Your Message' : 'आपका संदेश'}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button" disabled={isRateLimited}>
            {isRateLimited
              ? currentLanguage === 'en'
                ? 'Too Many Requests. Please Try Again Later.'
                : 'बहुत अधिक अनुरोध। कृपया बाद में प्रयास करें।'
              : submitStatus === 'sending'
              ? currentLanguage === 'en'
                ? 'Sending...'
                : 'भेज रहे हैं...'
              : submitStatus === 'success'
              ? currentLanguage === 'en'
                ? 'Message Sent!'
                : 'संदेश भेजा गया!'
              : submitStatus === 'error'
              ? currentLanguage === 'en'
                ? 'Submission Failed. Try Again.'
                : 'प्रस्तुतिकरण विफल। फिर से प्रयास करें।'
              : currentLanguage === 'en'
              ? 'Send Message'
              : 'संदेश भेजें'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelplineNumbers;
