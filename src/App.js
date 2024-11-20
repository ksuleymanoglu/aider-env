import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);

  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<CustomerList customers={customers} onAddCustomer={addCustomer} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
