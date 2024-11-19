import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // For styling the Home Page

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Green Basket</h1>
        <p>Your one-stop marketplace for fresh vegetables!</p>
      </header>

      <section className="home-links">
        <div className="home-link-item">
          <Link className="home-link" to="/shop">
            <h2>Shop Vegetables</h2>
            <p>Browse through our fresh collection of vegetables.</p>
          </Link>
        </div>

        <div className="home-link-item">
          <Link className="home-link" to="/login">
            <h2>Login</h2>
            <p>Log in to your account for a personalized experience.</p>
          </Link>
        </div>

        <div className="home-link-item">
          <Link className="home-link" to="/register">
            <h2>Register</h2>
            <p>Create an account to enjoy all features of Green Basket.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
