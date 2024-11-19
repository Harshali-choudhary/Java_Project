import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Navbar.css';

function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Get userId from localStorage
    const userId = localStorage.getItem('user_id');
    if (userId) {
      // Fetch the cart items for the logged-in user
      axios.get(`http://localhost:8080/cart/${userId}`)
        .then((response) => {
          // Set the number of items in the cart
          setCartItemCount(response.data.length);
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, []); // Run once on component mount

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">Green Basket</Link>
        <ul className="navbar-nav d-flex flex-row align-items-center">
          <li className="nav-item">
            <Link className="nav-link me-3" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link me-3" to="/shop">Shop</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link me-3" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link me-3" to="/register">Register</Link>
          </li>
          {/* Add Cart icon or link */}
          <li className="nav-item">
            <Link className="nav-link me-3" to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </Link>
          </li>
        </ul>
        <form className="d-flex align-items-center" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
