import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('No userId found in localStorage');
      setError('User is not logged in.');
      setIsLoading(false);
      return;
    }

    fetch(`http://localhost:8080/cart/getCartItem?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched cart items:', data); // Log the data structure
        setCartItems(data);
        calculateTotalAmount(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        setError('Failed to load cart items.');
        setIsLoading(false);
      });
  }, []);

  const calculateTotalAmount = (items) => {
    const total = items.reduce((sum, item) => {
      // Adjust based on your structure (e.g., item.price if directly accessible)
      if (item.price && item.quantity) {
        return sum + item.price * item.quantity;
      } else {
        console.warn("Skipping item with missing or invalid data:", item);
        return sum;
      }
    }, 0);
    setTotalAmount(total);
  };

  const handleCheckout = () => {
    navigate('/buy', { state: { cartItems, totalAmount } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {isLoading ? (
        <p>Loading cart items...</p>
      ) : error ? (
        <p>{error}</p>
      ) : cartItems.length > 0 ? (
        <div>
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img 
                  src={item.image_url} 
                  alt={item.vegetable_name} 
                  className="cart-item-image" 
                />
                <div className="cart-item-details">
                  <h3>{item.vegetable_name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Buy
          </button>
        </div>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
}

export default Cart;
