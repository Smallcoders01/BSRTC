import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './LanguageSelector.css';

const LanguageSelector = ({ onSelectLanguage }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('language');
    if (!selectedLanguage) {
      setShow(true);
    }
  }, []);

  const handleSelect = (language) => {
    onSelectLanguage(language);
    localStorage.setItem('language', language);
    setShow(false);
  };

  return (
    <Modal 
      show={show} 
      centered
      backdrop="static" 
      keyboard={false}
      className="language-selector-modal"
    >
      <Modal.Header>
        <Modal.Title className="w-100 text-center">
          <h2 className="mb-0">Select Your Language</h2>
          <p className="mb-0 mt-2">अपनी भाषा चुनें</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="language-options">
          <div 
            className="language-option" 
            onClick={() => handleSelect('en')}
            style={{ 
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              margin: '5px'
            }}
          >
            <h3 style={{ fontSize: '18px', margin: '0' }}>En</h3>
            <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Continue in English</p>
          </div>
          <div 
            className="language-option" 
            onClick={() => handleSelect('hi')}
            style={{ 
              padding: '10px',
              cursor: 'pointer',
              textAlign: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              margin: '5px'
            }}
          >
            <h3 style={{ fontSize: '18px', margin: '0' }}>हि</h3>
            <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>हिंदी में जारी रखें</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LanguageSelector;
