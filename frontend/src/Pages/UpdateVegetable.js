import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateVegetable.css';

function UpdateVegetable() {
  const { id } = useParams(); // Gets the vegetable ID from the URL
  const navigate = useNavigate();

  const [vegetable, setVegetable] = useState({
    vegetable_name: '',
    image_url: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    // Fetch existing vegetable details by ID
    fetch(`http://localhost:8080/vegetables/getById/${id}`)
      .then((response) => response.json())
      .then((data) => setVegetable(data))
      .catch((error) => console.error('Error fetching vegetable:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVegetable((prevVegetable) => ({
      ...prevVegetable,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the vegetable data
    fetch(`http://localhost:8080/vegetables/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vegetable)
    })
      .then(() => {
        alert('Vegetable updated successfully!');
        navigate('/admin'); // Redirect to the admin page after updating
      })
      .catch((error) => console.error('Error updating vegetable:', error));
  };

  return (
    <div className="update-vegetable-container">
      <h2>Update Vegetable</h2>
      <form onSubmit={handleSubmit} className="update-vegetable-form">
        <div className="field-container">
          <label htmlFor="vegetable_name">Name:</label>
          <input
            type="text"
            id="vegetable_name"
            name="vegetable_name"
            value={vegetable.vegetable_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field-container">
          <label htmlFor="image_url">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={vegetable.image_url}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field-container">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={vegetable.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={vegetable.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="update-btn">Update Vegetable</button>
      </form>
    </div>
  );
}

export default UpdateVegetable;
