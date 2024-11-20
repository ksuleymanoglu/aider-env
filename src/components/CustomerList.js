import React, { useState } from 'react';
import { exportToCSV } from '../utils/csvExport';
import './CustomerList.css';

function CustomerList({ customers, onAddCustomer, onUpdateCustomer }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCustomer(formData);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="customer-container">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Customer</button>
      </form>

      <div className="list-header">
        <h2>Customer List</h2>
        {customers.length > 0 && (
          <button 
            className="export-button"
            onClick={() => exportToCSV(customers, 'customers.csv')}
          >
            Export CSV
          </button>
        )}
      </div>
      {customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <div className="customer-table">
          <div className="table-header">
            <div className="header-cell">Name</div>
            <div className="header-cell">Email</div>
            <div className="header-cell">Phone</div>
            <div className="header-cell">Actions</div>
          </div>
          {customers.map(customer => (
            <div key={customer.id} className="table-row">
              {customer.editing ? (
                <div className="edit-form-row">
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => onUpdateCustomer(customer.id, { ...customer, name: e.target.value })}
                  />
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => onUpdateCustomer(customer.id, { ...customer, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => onUpdateCustomer(customer.id, { ...customer, phone: e.target.value })}
                  />
                  <div className="button-group">
                    <button 
                      className="edit-button save"
                      onClick={() => onUpdateCustomer(customer.id, { ...customer, editing: false })}
                    >
                      Save
                    </button>
                    <button 
                      className="edit-button cancel"
                      onClick={() => onUpdateCustomer(customer.id, { ...customer, editing: false })}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="table-cell">{customer.name}</div>
                  <div className="table-cell">{customer.email}</div>
                  <div className="table-cell">{customer.phone}</div>
                  <button 
                    className="edit-button"
                    onClick={() => onUpdateCustomer(customer.id, { ...customer, editing: true })}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerList;
