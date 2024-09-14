import React from 'react';
import { Collapse } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const faqs = [
  {
    question: "Can I choose my seat while booking?",
    answer: "Yes, you can choose your preferred seat from the available options during the booking process.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept various payment methods including credit/debit cards, UPI, and net banking.",
  },
  {
    question: "How can I cancel my bus ticket?",
    answer: "You can cancel your bus ticket through the booking portal or contact our customer support for assistance.",
  },
  {
    question: "Can I change my travel date after booking?",
    answer: "Yes, you can change your travel date depending on availability and terms of service.",
  },
];

const FAQSection = () => {
  return (
    <div style={{ backgroundColor: '#faf5ff', padding: '60px', borderRadius: '16px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>FAQs</h2>
      <Collapse
        accordion
        expandIconPosition="right"
        bordered={false}
        expandIcon={({ isActive }) =>
          isActive ? (
            <CloseOutlined style={{ fontSize: '18px', color: '#1a1a1a' }} />
          ) : (
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#1a1a1a', textAlign: 'center', lineHeight: '18px', color: 'white', fontSize: '12px' }}>+</div>
          )
        }
      >
        {faqs.map((faq, index) => (
          <Panel
            header={faq.question}
            key={index}
            style={{ backgroundColor: index === 0 ? '#fef9e4' : 'white', borderRadius: '12px', marginBottom: '16px' }}
            showArrow={false}
          >
            <p style={{ margin: 0 }}>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQSection;
