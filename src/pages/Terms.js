import React from 'react';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import './Terms.css';

const Terms = () => {
  return (
    <div>
      <Banner />
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4" style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>Terms & Service</h1>

            <div className="terms-content" style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              <h2 className="mt-4 mb-3" style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginTop: '30px'
              }}>Terms of Use</h2>

              <p>
                By accessing and using the HRTC website and services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.
              </p>

              <h2 className="mt-4 mb-3">Acceptance of Terms</h2>
              <p>
                By accessing and using HRTC's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
              </p>

              <h2 className="mt-4 mb-3">Service Description</h2>
              <p>
                HRTC provides bus transportation services, online booking facilities, and related services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>

              <h2 className="mt-4 mb-3">User Obligations</h2>
              <ul className="list-unstyled" style={{ marginLeft: '20px' }}>
                <li className="mb-2">• Provide accurate and complete information during registration</li>
                <li className="mb-2">• Maintain the confidentiality of your account credentials</li>
                <li className="mb-2">• Comply with all applicable laws and regulations</li>
                <li className="mb-2">• Not interfere with the proper working of the service</li>
                <li className="mb-2">• Not engage in any fraudulent activities</li>
              </ul>

              <h2 className="mt-4 mb-3">Booking and Cancellation</h2>
              <p>
                All bookings are subject to availability. Cancellation policies vary based on the type of service and timing of cancellation. Please refer to our cancellation policy for specific details.
              </p>

              <h2 className="mt-4 mb-3">Payment Terms</h2>
              <p>
                Users agree to pay all fees and charges associated with their bookings. All payments must be made through our authorized payment channels. Prices are subject to change without prior notice.
              </p>

              <h2 className="mt-4 mb-3">Liability</h2>
              <p>
                HRTC strives to provide reliable services but cannot guarantee uninterrupted access to our services. We are not liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services.
              </p>

              <h2 className="mt-4 mb-3">Modifications to Terms</h2>
              <p>
                HRTC reserves the right to modify these terms at any time. Users will be notified of any changes through our website. Continued use of our services after such modifications constitutes acceptance of the new terms.
              </p>

              <h2 className="mt-4 mb-3">Contact Information</h2>
              <p>
                For any questions regarding these terms of service, please contact our customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;