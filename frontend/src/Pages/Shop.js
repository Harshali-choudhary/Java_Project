import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'; 
import './Shop.css';

function Shop() {
  const [vegetables, setVegetables] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from backend or retrieve from localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`http://localhost:8080/User/getById?id=${userId}`) // Corrected URL with backticks
        .then((response) => response.json())
        .then((data) => {
          setUserDetails(data);
          // Store user details in localStorage
          localStorage.setItem('userDetails', JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching user details:', error));
    } else {
      navigate('/login'); // Redirect to login if no user is logged in
    }

    // Fetch the vegetables from the backend
    fetch('http://localhost:8080/Vegetable/getAll')
      .then((response) => response.json())
      .then((data) => {
        setVegetables(data);
      })
      .catch((error) => console.error('Error fetching vegetables:', error));
  }, [navigate]);

  // Handle adding an item to the cart
  const handleAddToCart = (vegetableId) => {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage

    if (!userId) {
      console.error('User ID not found in localStorage');
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/cart/add`, { // Corrected URL with backticks
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId: parseInt(userId, 10), // Convert user ID to integer
        vegetableId: vegetableId,
        quantity: 1,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Decrease the quantity of the vegetable in the frontend
          setVegetables((prevVegetables) =>
            prevVegetables.map((veg) =>
              veg.vegetable_id === vegetableId
                ? { ...veg, quantity: veg.quantity - 1 }
                : veg
            )
          );

          // Navigate to Cart page
          navigate('/cart');
        } else {
          console.error('Failed to add item to cart');
        }
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  return (
    <div>
      <Navbar /> 
      <div className="shop-page">
        <h1>Shop for Vegetables</h1>

        {/* Display user details */}
        {userDetails && (
          <div className="user-details">
            <p><strong>User ID:</strong> {userDetails.user_id}</p>
            <p><strong>First Name:</strong> {userDetails.first_name}</p>
            <p><strong>Last Name:</strong> {userDetails.last_name}</p>
          </div>
        )}

        <div className="vegetable-grid">
          {vegetables.map((vegetable) => (
            <div key={vegetable.vegetable_id} className="vegetable-card">
              <img
                src={vegetable.image_url}
                alt={vegetable.vegetable_name}
                className="vegetable-image"
              />
              <h2 className="vegetable-name">{vegetable.vegetable_name}</h2>
              <p className="vegetable-price">
                ${vegetable.price?.toFixed(2) || 'Price not available'}
              </p>
              <p className="vegetable-quantity">Available: {vegetable.quantity}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(vegetable.vegetable_id)}
                disabled={vegetable.quantity <= 0}  // Disable if out of stock
              >
                {vegetable.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
