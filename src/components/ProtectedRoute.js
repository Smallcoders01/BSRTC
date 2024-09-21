import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('Rendering ProtectedRoute component');

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the user is authenticated and has the 'admin' role
  return user && user.role === 'admin' ? Component : null;
};

export default ProtectedRoute;