import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const LoginComponent = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="offset-md-3">
          <h3 className="text-center mb-4">Login</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <p className="mt-3 text-center">
              Don't have an account? <a href="/signup">Sign up here</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
