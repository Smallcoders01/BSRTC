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
          >
            <div className="language-icon">🇬🇧</div>
            <h3>English</h3>
            <p>Continue in English</p>
          </div>
          <div 
            className="language-option" 
            onClick={() => handleSelect('hi')}
          >
            <div className="language-icon">🇮🇳</div>
            <h3>हिंदी</h3>
            <p>हिंदी में जारी रखें</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LanguageSelector;
