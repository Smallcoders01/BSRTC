import React from 'react';
import './HelplineNumbers.css'; // Import the external CSS file

const HelplineNumbers = () => {
  return (
    <div className="helpline-container">
       
      {/* Contact Details Section */}
      <div className="contact-bar d-flex justify-content-center align-items-center">
        
        <div className="contact-item">
          <i className="bi bi-telephone-fill"></i> 9798047742, 9508633131
        </div>
        <div className="contact-item">
          <i className="bi bi-envelope-fill"></i> bsrtcreports@gmail.com
        </div>
      </div>

      {/* Helpline Numbers Section */}
      <div className="container mt-5">
        <h2 className="text-center">BSRTC Helpline Number</h2>
        <div className="row mt-4">
          {/* Patna Division */}
          <div className="col-md-4">
            <div className="division-card">
              <h4>Patna Division</h4>
              <p>RM Patna</p>
              <p>0612-2677888</p>
              <p>Patnabsrtcreport@gmail.com</p>
            </div>
          </div>
          {/* Gaya Division */}
          <div className="col-md-4">
            <div className="division-card">
              <h4>Gaya Division</h4>
              <p>RM Gaya</p>
              <p>0631-2222628</p>
              <p>gayabsrtcreports@gmail.com</p>
            </div>
          </div>
          {/* Bhagalpur Division */}
          <div className="col-md-4">
            <div className="division-card">
              <h4>Bhagalpur Division</h4>
              <p>RM Bhagalpur</p>
              <p>0641-2400566</p>
              <p>bhagalpurbsrtcreports@gmail.com</p>
            </div>
          </div>
          {/* Muzaffarpur Division */}
          <div className="col-md-4">
            <div className="division-card">
              <h4>Muzaffarpur Division</h4>
              <p>RM Muzaffarpur</p>
              <p>0621-2212419</p>
              <p>muzaffarpurbsrtcreports@gmail.com</p>
            </div>
          </div>
          {/* Darbhanga Division */}
          <div className="col-md-4">
            <div className="division-card">
              <h4>Darbhanga Division</h4>
              <p>RM Darbhanga</p>
              <p>6204750133</p>
              <p>muzaffarpurbsrtcreports@gmail.com</p>
            </div>
          </div>
          {/* Purnia Division */}
          <div className="col-md-4">
            <div className="division-card">
              <h4>Purnia Division</h4>
              <p>RM Purnia</p>
              <p>06454-242276</p>
              <p>purneabsrtcreport@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelplineNumbers;
