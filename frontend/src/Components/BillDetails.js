import React, { useState, useEffect } from 'react';
import './BillDetails.css';

function BillDetails() {
  const [billDetails, setBillDetails] = useState([]);
  const [formData, setFormData] = useState({
    userId: '',
    orderId: '',
    transactionDate: '',
    transactionMode: '',
    transactionStatus: ''
  });
  const [editingBillId, setEditingBillId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all bill details on component mount
  useEffect(() => {
    fetch('http://localhost:8080/billDetails/getAll')
      .then((response) => response.json())
      .then((data) => setBillDetails(data))
      .catch((error) => setError('Failed to fetch bill details.'));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit for adding/updating bill
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBillId) {
      // Update bill details
      fetch(`http://localhost:8080/billDetails/update/${editingBillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((updatedBill) => {
          setBillDetails((prevBills) =>
            prevBills.map((bill) => (bill.billId === editingBillId ? updatedBill : bill))
          );
          setEditingBillId(null);
          setFormData({ userId: '', orderId: '', transactionDate: '', transactionMode: '', transactionStatus: '' });
        })
        .catch((error) => setError('Failed to update bill details.'));
    } else {
      // Add new bill details
      fetch('http://localhost:8080/billDetails/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((newBill) => {
          setBillDetails((prevBills) => [...prevBills, newBill]);
          setFormData({ userId: '', orderId: '', transactionDate: '', transactionMode: '', transactionStatus: '' });
        })
        .catch((error) => setError('Failed to add bill details.'));
    }
  };

  // Handle edit button click
  const handleEdit = (bill) => {
    setEditingBillId(bill.billId);
    setFormData({
      userId: bill.userId,
      orderId: bill.orderId,
      transactionDate: bill.transactionDate,
      transactionMode: bill.transactionMode,
      transactionStatus: bill.transactionStatus
    });
  };

  // Handle delete button click
  const handleDelete = (billId) => {
    fetch(`http://localhost:8080/billDetails/delete/${billId}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setBillDetails((prevBills) => prevBills.filter((bill) => bill.billId !== billId));
        } else {
          setError('Failed to delete bill.');
        }
      })
      .catch((error) => setError('Failed to delete bill.'));
  };

  return (
    <div className="bill-details-container">
      <h2>Bill Details</h2>
      {error && <p className="error">{error}</p>}

      {/* List of bills */}
      <ul>
        {billDetails.map((bill) => (
          <li key={bill.billId} className="bill-item">
            <p><strong>Bill ID:</strong> {bill.billId}</p>
            <p><strong>User ID:</strong> {bill.userId}</p>
            <p><strong>Order ID:</strong> {bill.orderId}</p>
            <p><strong>Transaction Date:</strong> {bill.transactionDate}</p>
            <p><strong>Transaction Mode:</strong> {bill.transactionMode}</p>
            <p><strong>Transaction Status:</strong> {bill.transactionStatus}</p>
            <button onClick={() => handleEdit(bill)}>Edit</button>
            <button onClick={() => handleDelete(bill.billId)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form for adding/updating bills */}
      <form onSubmit={handleSubmit}>
        <h3>{editingBillId ? 'Edit Bill' : 'Add Bill'}</h3>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="orderId"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="transactionDate"
          value={formData.transactionDate}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="transactionMode"
          placeholder="Transaction Mode"
          value={formData.transactionMode}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="transactionStatus"
          placeholder="Transaction Status"
          value={formData.transactionStatus}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingBillId ? 'Update Bill' : 'Add Bill'}</button>
      </form>
    </div>
  );
}

export default BillDetails;
