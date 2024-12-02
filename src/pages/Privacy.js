import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import { CircularProgress } from '@mui/material';
import './Privacy.css';

const CACHE_KEY = 'privacyContent';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

const Privacy = () => {
  const [privacyData, setPrivacyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('language') || 'en';

  // Static introduction content
  const introContent = {
    en: {
      title: "Privacy Policy",
      intro: `This Privacy Policy governs the manner in which Bihar State Road Transport Corporation (BSRTC) 
      collects, uses, maintains and discloses information collected from users (each, a "User") of the BSRTC 
      website. This privacy policy applies to the site and all products and services offered by BSRTC.`
    },
    hi: {
      title: "गोपनीयता नीति",
      intro: `यह गोपनीयता नीति बिहार राज्य सड़क परिवहन निगम (BSRTC) द्वारा BSRTC वेबसाइट के 
      उपयोगकर्ताओं (प्रत्येक, एक "उपयोगकर्ता") से एकत्र की गई जानकारी को एकत्र करने, उपयोग करने, 
      बनाए रखने और प्रकट करने के तरीके को नियंत्रित करती है। यह गोपनीयता नीति साइट और BSRTC 
      द्वारा प्रदान की जाने वाली सभी उत्पादों और सेवाओं पर लागू होती है।`
    }
  };

  useEffect(() => {
    const fetchPrivacyContent = async () => {
      // Check cache first
      const cachedData = localStorage.getItem(`${CACHE_KEY}_${language}`);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_${language}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTimestamp) < CACHE_EXPIRATION) {
          console.log('Privacy: Using cached data');
          setPrivacyData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get(`${config.apiBaseUrl}/privacy`);
        const data = response.data;
        
        // Format data based on language
        const formattedData = data.map(item => ({
          title: language === 'en' ? item.titleEn : item.titleHi,
          content: language === 'en' ? item.contentEn : item.contentHi
        }));

        setPrivacyData(formattedData);
        localStorage.setItem(`${CACHE_KEY}_${language}`, JSON.stringify(formattedData));
        localStorage.setItem(`${CACHE_KEY}_${language}_timestamp`, new Date().getTime().toString());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setError('Error loading privacy policy');
        setLoading(false);
      }
    };

    fetchPrivacyContent();
  }, [language]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  const contentStyle = {
    paddingLeft: '75px',  // Consistent left padding for all content
    paddingRight: '75px',
    textAlign: 'left'     // Ensure left alignment
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '30px',
    paddingLeft: '75px',  // Match the content padding
    textAlign: 'left'     // Ensure left alignment
  };

  const sectionStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginTop: '30px',
    marginBottom: '15px',
    color: '#333'
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '20px'
  };

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
                  <p style={paragraphStyle}>
                    {introContent[language].intro}
                  </p>
                </div>

                {/* Dynamic Content */}
                <div className="privacy-content">
                  {privacyData.map((section, index) => (
                    <div key={index} style={{ marginBottom: '30px' }}>
                      {section.title && (
                        <h2 style={sectionStyle}>
                          {section.title}
                        </h2>
                      )}
                      <div 
                        dangerouslySetInnerHTML={{ __html: section.content }} 
                        style={paragraphStyle}
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

export default Privacy;
