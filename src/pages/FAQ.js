import React, { useState, useEffect } from 'react';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import axios from 'axios';
import config from '../config';
import './FAQ.css';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [language] = useState(localStorage.getItem('language') || 'en');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the FAQs from the backend API with language parameter
    axios.get(`${config.apiBaseUrl}/faq/${language}`)
      .then(response => {
        setFaqs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
        setError('Error fetching FAQs');
        setLoading(false);
      });
  }, [language]); // Added language dependency

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <Banner />
        <div className="container my-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Banner />
        <div className="container my-5 text-center">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div>
      <Banner />
      <div className="container-fluid faq-container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-lg-10">
            <h2 className="faq-title">
              {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
            </h2>
            
            <div className="search-container">
              <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder={language === 'en' ? 'Search for a question' : 'प्रश्न खोजें'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="faq-list">
              {filteredFaqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <div
                    className="faq-question"
                    onClick={() => toggleOpen(index)}
                  >
                    <h5>{faq.question}</h5>
                    <span className="faq-toggle-symbol">
                      {openIndex === index ? '×' : '+'}
                    </span>
                  </div>
                  <div className={`faq-answer ${openIndex === index ? 'show' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FAQSection;