import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config'; // Adjust the path to the correct location of your config file
import './FAQ.css'; // External CSS file for custom styles

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the FAQs from the backend API
    axios.get(`${config.apiBaseUrl}/faq`)
      .then(response => {
        setFaqs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching FAQs');
        setLoading(false);
      });
  }, []);

  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container-fluid faq-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 faqs">
          <h2 className="faq-title">FAQs</h2>
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div
                className={`faq-question ${open === index || viewAll ? 'open' : ''}`}
                onClick={() => toggleOpen(index)}
              >
                <h5>{faq.question}</h5>
                <span className="faq-toggle-symbol">
                  {open === index || viewAll ? 'X' : '+'}
                </span>
              </div>
              <div className={`faq-answer ${open === index || viewAll ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
          <div className="faq-button-container">
            <button className="view-all-btn" onClick={toggleViewAll}>
              {viewAll ? 'Collapse All' : 'View All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
