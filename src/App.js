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

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...updatedCustomer, id } : customer
    ));
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<CustomerList 
              customers={customers} 
              onAddCustomer={addCustomer}
              onUpdateCustomer={updateCustomer}
            />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
