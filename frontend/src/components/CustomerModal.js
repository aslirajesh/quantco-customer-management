import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const CustomerModal = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d+$/;
  
    if (!formData.first_name) {
      tempErrors.first_name = "First name is required";
    } else if (!nameRegex.test(formData.first_name)) {
      tempErrors.first_name = "First name can only contain alphabets and spaces";
    }
  
    if (!formData.last_name) {
      tempErrors.last_name = "Last name is required";
    } else if (!nameRegex.test(formData.last_name)) {
      tempErrors.last_name = "Last name can only contain alphabets and spaces";
    }
  
    if (!formData.date_of_birth) {
      tempErrors.date_of_birth = "Date of birth is required";
    } else if (new Date(formData.date_of_birth) >= new Date()) {
      tempErrors.date_of_birth = "Date of birth must be in the past";
    }
  
    if (!formData.phone_number) {
      tempErrors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number)) {
      tempErrors.phone_number = "Phone number can only contain digits";
    }
  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (customer) {
        const response = await axiosInstance.patch(`/customers/${customer.id}/`, formData);
        onSave(response.data);
      } else {
        const response = await axiosInstance.post('/customers/', formData);
        onSave(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">{customer ? 'Edit Customer' : 'Add Customer'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.date_of_birth && <p className="text-red-500">{errors.date_of_birth}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
            {customer ? 'Save' : 'Add'}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
