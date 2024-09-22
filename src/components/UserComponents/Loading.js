// Loading.js
import React from 'react';
import './Loading.css'; // Add CSS for spinner

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
