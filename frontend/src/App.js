import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
