import React, { useState, useEffect } from 'react';

function Buy() {
  const [billDetails, setBillDetails] = useState(null);
  const [address, setAddress] = useState('');
  const [transactionMode, setTransactionMode] = useState(''); // New state for transaction mode
  const [totalAmount, setTotalAmount] = useState(0); // New state for total amount
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    // Fetching bill details
    fetch('http://localhost:8080/bill/getAll')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bill details');
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const latestBill = data[data.length - 1]; // Assuming last entry is the latest
          setBillDetails(latestBill);
          setTotalAmount(latestBill.totalAmount); // Set total amount from bill details
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bill details:', error);
        setError('Failed to load bill details');
        setIsLoading(false);
      });
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleTransactionModeChange = (e) => {
    setTransactionMode(e.target.value);
  };

  const handleSubmitOrder = () => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    fetch(`http://localhost:8080/bill/placeOrder?userId=${userId}&transactionMode=${transactionMode}&totalAmount=${totalAmount}&address=${address}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          alert('Order placed successfully!');
          setAddress('');
          setTransactionMode('');
          setOrderStatus('Order placed successfully!');
        } else {
          throw new Error('Failed to place order');
        }
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        setOrderStatus('Failed to place order');
      });
  };

  return (
    <div>
      <h2>Bill Details</h2>
      {isLoading ? (
        <p>Loading bill details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : billDetails ? (
        <div>
          <p><strong>Bill ID:</strong> {billDetails.bill_id}</p>
          <p><strong>Transaction Date:</strong> {billDetails.transaction_date}</p>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
          
          <h3>Enter Delivery Address</h3>
          <textarea
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your address"
            rows="4"
            cols="50"
          />

          <h3>Select Transaction Mode</h3>
          <select value={transactionMode} onChange={handleTransactionModeChange}>
            <option value="">Select Mode</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          
          <br /><br />
          <button onClick={handleSubmitOrder}>Place Order</button>
          
          {orderStatus && <p>{orderStatus}</p>}
        </div>
      ) : (
        <p>No bill details available.</p>
      )}
    </div>
  );
}

export default Buy;
