import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password, captchaToken) => {
    const response = await axios.post(`${config.apiBaseUrl}/auth/login`, { email, password, captchaToken });
    localStorage.setItem('token', response.data.token);
    await fetchUser(); // Fetch user data immediately after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };