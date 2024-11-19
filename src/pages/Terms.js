import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import { CircularProgress } from '@mui/material';
import './Terms.css';

const CACHE_KEY = 'termsContent';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

const Terms = () => {
  const [termsData, setTermsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('language') || 'en';

  // Static introduction content
  const introContent = {
    en: {
      title: "Terms of Use",
      intro: `This Terms of Use governs the manner in which Bihar State Road Transport Corporation (BSRTC) 
      provides services and maintains relationships with users (each, a "User") of the BSRTC website. 
      These terms apply to the site and all products and services offered by BSRTC.`
    },
    hi: {
      title: "उपयोग की शर्तें",
      intro: `यह उपयोग की शर्तें बिहार राज्य सड़क परिवहन निगम (BSRTC) द्वारा सेवाएं प्रदान करने और 
      BSRTC वेबसाइट के उपयोगकर्ताओं (प्रत्येक, एक "उपयोगकर्ता") के साथ संबंधों को बनाए रखने के तरीके 
      को नियंत्रित करती हैं। ये शर्तें साइट और BSRTC द्वारा प्रदान की जाने वाली सभी उत्पादों और 
      सेवाओं पर लागू होती हैं।`
    }
  };

  useEffect(() => {
    const fetchTermsContent = async () => {
      const cachedData = localStorage.getItem(`${CACHE_KEY}_${language}`);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_${language}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTimestamp) < CACHE_EXPIRATION) {
          setTermsData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.apiBaseUrl}/terms`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const formattedData = response.data.map(item => ({
          title: language === 'en' ? item.titleEn : item.titleHi,
          content: language === 'en' ? item.contentEn : item.contentHi
        }));

        setTermsData(formattedData);
        localStorage.setItem(`${CACHE_KEY}_${language}`, JSON.stringify(formattedData));
        localStorage.setItem(`${CACHE_KEY}_${language}_timestamp`, new Date().getTime().toString());
        setLoading(false);
      } catch (err) {
        setError('Error fetching terms content');
        setLoading(false);
      }
    };

    fetchTermsContent();
  }, [language]);

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

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

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

                {/* Dynamic Content */}
                <div className="terms-content">
                  {termsData.map((section, index) => (
                    <div key={index} style={{ marginBottom: '30px' }}>
                      {section.title && (
                        <h2 style={{
                          fontSize: '24px',
                          fontWeight: '600',
                          marginTop: '30px',
                          marginBottom: '15px',
                          color: '#333'
                        }}>
                          {section.title}
                        </h2>
                      )}
                      <div 
                        dangerouslySetInnerHTML={{ __html: section.content }}
                        style={{
                          fontSize: '16px',
                          lineHeight: '1.8',
                          color: '#444',
                          marginBottom: '20px'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Terms;