import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CustomerModal from './CustomerModal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosInstance.get('customers');
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/customers/${id}/`);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = (customer) => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => (c.id === customer.id ? customer : c)));
    } else {
      setCustomers([...customers, customer]);
    }
    setShowModal(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => {
          setSelectedCustomer(null);
          setShowModal(true);
        }}
      >
        Add Customer
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Date of Birth</th>
            <th className="border border-gray-300 p-2">Phone Number</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td className="border border-gray-300 p-2">{customer.first_name}</td>
              <td className="border border-gray-300 p-2">{customer.last_name}</td>
              <td className="border border-gray-300 p-2">{customer.date_of_birth}</td>
              <td className="border border-gray-300 p-2">{customer.phone_number}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => handleDelete(customer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CustomerList;
