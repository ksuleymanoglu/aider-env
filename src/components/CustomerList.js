import React, { useState } from 'react';

function CustomerList({ customers, onAddCustomer }) {
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
    <div>
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>

      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers yet.</p>
      ) : (
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>
              <strong>{customer.name}</strong> - {customer.email} - {customer.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerList;
