import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:8080/User/login', { email, password });
      
      if (response.status === 200) {
        const { message, role, userId } = response.data;

        // Store the user data in localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        // Optionally, you can store the message for display purposes
        localStorage.setItem('loginMessage', message);

        // Redirect based on user role (for example, admin or customer)
        if (role === 'ADMIN') {
          navigate('/admin'); // Redirect to admin dashboard
        } else if (role === 'CUSTOMER') {
          navigate('/shop'); // Redirect to shop page
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
