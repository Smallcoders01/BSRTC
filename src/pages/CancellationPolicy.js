import React, { useEffect } from 'react';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import './CancellationPolicy.css';

const CancellationPolicy = () => {
  // Static introduction content
  const introContent = {
    en: {
      title: "Cancellation Policy",
    },
    hi: {
      title: "रद्द करने की नीति",
    }
  };

  const language = localStorage.getItem('language') || 'en';

  const contentStyle = {
    paddingLeft: '75px',
    paddingRight: '75px',
    textAlign: 'left'
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '30px',
    paddingLeft: '75px',
    textAlign: 'left'
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <Banner />
        <div className="container-fluid my-5">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-4" style={headingStyle}>
                {introContent[language].title}
              </h1>

              <div style={contentStyle}>
                {/* Static Introduction */}
                <div className="mb-5">
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#444',
                    marginBottom: '30px'
                  }}>
                    {introContent[language].intro}
                  </p>
                </div>

                {/* Cancellation Policy Details */}
                <div className="cancellation-content">
                  <ol style={{ fontSize: '16px', lineHeight: '1.8', color: '#444' }}>
                    <li>Cancellation 1 Day Before Departure: If a cancellation is made at least 1 day before the scheduled departure, a refund of 85% will be issued.</li>
                    <li>Cancellation Between 1 Day and 12 Hours Before Departure: If a cancellation is made between 1 day and 12 hours before the scheduled departure, a refund of 80% will be issued.</li>
                    <li>Cancellation Between 12 Hours and 4 Hours Before Departure: If a cancellation is made between 12 hours and 4 hours before the scheduled departure, a refund of 50% will be issued.</li>
                    <li>Cancellation Within 4 Hours of Departure: If a cancellation is made within 4 hours of the scheduled departure time, no refund will be provided.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CancellationPolicy; 