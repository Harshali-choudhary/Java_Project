import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Registration() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  const [role, setRole] = useState('CUSTOMER'); // Default role set to Customer
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Logging the state values before sending the request
    console.log("Form values:", { first_name, last_name, email, password, mobile_no, role });

    const timestamp = new Date().getTime(); // Generate a unique timestamp to avoid caching
    try {
      const response = await fetch(`http://localhost:8080/User/insert?t=${timestamp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          mobile_no,
          role,
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        console.error('Registration failed', await response.json());
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2 style={{ marginTop: '20px' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile_no">Mobile No.:</label>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile_no}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
