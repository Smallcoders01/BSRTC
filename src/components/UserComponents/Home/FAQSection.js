import React, { useState } from 'react';
import './FAQ.css'; // External CSS file for custom styles

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  const [viewAll, setViewAll] = useState(false);

  const faqs = [
    {
      question: 'Can I choose my seat while booking?',
      answer: 'Yes, you can choose your preferred seat from the available options during the booking process.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, online banking, and digital wallets.',
    },
    {
      question: 'How can I cancel my bus ticket?',
      answer: 'You can cancel your ticket through the "My Bookings" section on our website.',
    },
    {
      question: 'Can I change my travel date after booking?',
      answer: 'Yes, you can change the travel date by contacting our support team.',
    },
  ];

  const toggleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  return (
    <div className="container-fluid faq-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
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
