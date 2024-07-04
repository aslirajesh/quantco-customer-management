import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerList from '../components/CustomerList';
import axiosInstance from '../axiosInstance';

const CustomersPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const handleLogout = async () => {
    await axiosInstance().post('account/logout/', {}, );
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <CustomerList />
    </div>
  );
};

export default CustomersPage;
