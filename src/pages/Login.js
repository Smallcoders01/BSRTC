import React from 'react';
import LoginModal from '../components/UserComponents/Login/LoginComp';

const Login = () => {
  console.log('Rendering Login component');

  return (
    <div>
      <h2>Login</h2>
      <LoginModal />
    </div>
  );
};

export default Login;