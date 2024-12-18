import React, { useState, useRef } from 'react';
import { exportToCSV } from '../utils/csvExport';
import { parseCSV } from '../utils/csvUpload';
import './CustomerList.css';

function CustomerList({ customers, onAddCustomer, onUpdateCustomer, onDeleteCustomer }) {
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
        <div className="csv-buttons">
          <input
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={async (e) => {
              try {
                const file = e.target.files[0];
                if (file) {
                  const customersData = await parseCSV(file);
                  // Add all customers at once with unique IDs
                  const customersWithIds = customersData.map(customer => ({
                    ...customer,
                    id: Date.now() + Math.random()
                  }));
                  onAddCustomer(customersWithIds);
                }
              } catch (error) {
                alert('Error reading CSV file');
              }
              e.target.value = '';
            }}
            id="csv-upload"
          />
          <label className="upload-button" htmlFor="csv-upload">
            Upload CSV
          </label>
          {customers.length > 0 && (
            <button 
              className="export-button"
              onClick={() => exportToCSV(customers, 'customers.csv')}
            >
              Export CSV
            </button>
          )}
        </div>
      </div>
      {customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <div className="customer-table">
          <div className="table-header">
            <div className="header-cell">Name</div>
            <div className="header-cell">Email</div>
            <div className="header-cell">Phone</div>
            <div className="header-cell"></div>
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
                  <div className="action-buttons">
                    <button 
                      className="edit-button"
                      onClick={() => onUpdateCustomer(customer.id, { ...customer, editing: true })}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => onDeleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </div>
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
