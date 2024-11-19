// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import AddVegetableForm from '../Pages/AddVegetableForm';
import './AdminPage.css';

function AdminPage() {
  const [vegetables, setVegetables] = useState([]);
  const [adminDetails, setAdminDetails] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Control form visibility
  const navigate = useNavigate();

  const adminId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!adminId || role !== 'ADMIN') {
      console.error('Admin ID or role is not available. Please log in.');
      navigate('/login');
      return;
    }

    // Fetch vegetables added by the logged-in admin
    fetch(`http://localhost:8080/Vegetable/getByAdmin?adminId=${adminId}`)
      .then((response) => response.json())
      .then((data) => setVegetables(data))
      .catch((error) => console.error('Error fetching vegetables:', error));

    // Fetch admin details
    fetch(`http://localhost:8080/User/getById?id=${adminId}`)
      .then((response) => response.json())
      .then((data) => setAdminDetails(data))
      .catch((error) => console.error('Error fetching admin details:', error));
  }, [adminId, role, navigate]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/Vegetable/delete?id=${id}`, { method: 'DELETE' })
      .then(() => setVegetables(vegetables.filter((veg) => veg.vegetable_id !== id)))
      .catch((error) => console.error('Error deleting vegetable:', error));
  };

  return (
    <div>
      <Navbar />
      <div className="admin-page-container">
        <h1>Admin Dashboard</h1>
        {adminDetails && (
          <div className="admin-info">
            <h2>Welcome, {adminDetails.first_name} {adminDetails.last_name}!</h2>
            <p><strong>User ID:</strong> {adminDetails.user_id}</p>
          </div>
        )}
        <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : 'Add Vegetable'}
        </button>
        {showAddForm && <AddVegetableForm adminId={adminId} />}
        <table className="vegetable-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vegetables.map((veg) => (
              <tr key={veg.vegetable_id}>
                <td>{veg.vegetable_id}</td>
                <td>{veg.vegetable_name}</td>
                <td>
                  <img src={veg.image_url} alt={veg.vegetable_name} className="veg-image" />
                </td>
                <td>${veg.price?.toFixed(2)}</td>
                <td>{veg.quantity}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/update-vegetable/${veg.vegetable_id}`)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(veg.vegetable_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
