import React from 'react';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import './Privacy.css';
const Privacy = () => {
  return (
    <>
    <div>
      <Banner />
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4" style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>Privacy Policy</h1>

            <div className="privacy-content" style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              <p>
                This Privacy Policy governs the manner in which HRTC collects, uses, maintains and discloses
                information collected from users (each, a "User") of the website. This privacy policy
                applies to the site and all products and services offered by HRTC.
              </p>

              <h2 className="mt-4 mb-3" style={{
                fontSize: '24px',
                fontWeight: '600',
                marginTop: '30px'
              }}>Personal identification information</h2>
              
              <p>
                We may collect personal identification information from Users in a variety of ways in connection with activities,
                services, features or resources we make available on our Site. Users may visit our Site anonymously. We will collect
                personal identification information from Users only if they voluntarily submit such information to us. Users can always
                refuse to supply personally identification information, except that it may prevent them from engaging in certain Site
                related activities.
              </p>

              <h2 className="mt-4 mb-3">Non-personal identification information</h2>
              <p>
                We may collect non-personal identification information about Users whenever they interact with our Site.
                Non-personal identification information may include the browser name, the type of computer and technical
                information about Users means of connection to our Site, such as the operating system and the Internet
                service providers utilized and other similar information.
              </p>

              <h2 className="mt-4 mb-3">How we use collected information</h2>
              <p>
                HRTC may collect and use Users personal information for the following purposes:
              </p>
              <ul className="list-unstyled" style={{ marginLeft: '20px' }}>
                <li className="mb-2">• To improve customer service</li>
                <li className="mb-2">• To personalize user experience</li>
                <li className="mb-2">• To improve our Site</li>
                <li className="mb-2">• To process payments</li>
                <li className="mb-2">• To send periodic emails</li>
              </ul>

              <h2 className="mt-4 mb-3">How we protect your information</h2>
              <p>
                We adopt appropriate data collection, storage and processing practices and security measures to protect
                against unauthorized access, alteration, disclosure or destruction of your personal information,
                username, password, transaction information and data stored on our Site.
              </p>

              <h2 className="mt-4 mb-3">Sharing your personal information</h2>
              <p>
                We do not sell, trade, or rent Users personal identification information to others. We may share generic
                aggregated demographic information not linked to any personal identification information regarding
                visitors and users with our business partners, trusted affiliates and advertisers for the purposes
                outlined above.
              </p>

              <h2 className="mt-4 mb-3">Changes to this privacy policy</h2>
              <p>
                HRTC has the discretion to update this privacy policy at any time. When we do, we will revise
                the updated date at the bottom of this page. We encourage Users to frequently check this page
                for any changes to stay informed about how we are helping to protect the personal information
                we collect.
              </p>
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
