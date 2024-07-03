import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/customers');
    }
  }, [token, navigate]);

  return <LoginForm />;
};

export default LoginPage;
