import React, { useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';

import Footer from '../Footer/footer';
import Banner from '../Banner';

const ViewProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <>
      <Banner />
      <Container className="mt-5">
          <div>Please log in to view your profile.</div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Banner />
      <Container className="mt-5 mb-5">
        <Card className="border-0 shadow">
          <Card.Header as="h2" className="text-center bg-transparent border-bottom">User Profile</Card.Header>
          <Card.Body>
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="bg-light rounded-circle p-3 mb-3">
                <FaUser size={50} color="#6c757d" />
              </div>
              <h3>{user.name}</h3>
            </div>
            <Card.Text className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-2" /> {user.email}
            </Card.Text>
            <Card.Text className="d-flex align-items-center mb-4">
              <FaPhone className="me-2" /> {user.phoneNumber || 'Not provided'}
            </Card.Text>
            <div className="text-center">
              <Button 
                as={Link} 
                to="/" 
                variant="outline-primary"
                className="d-flex align-items-center justify-content-center mx-auto"
                style={{ width: 'fit-content' }}
              >
                <FaHome className="me-2" /> Back to Home
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ViewProfile;