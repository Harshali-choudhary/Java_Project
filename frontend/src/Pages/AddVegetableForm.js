// AddVegetableForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVegetableForm({ adminId }) {
  const [vegetableName, setVegetableName] = useState('');
  const [vegetablePrice, setVegetablePrice] = useState('');
  const [vegetableQuantity, setVegetableQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const vegetable = {
      vegetable_name: vegetableName,
      price: vegetablePrice,
      quantity: vegetableQuantity,
      image_url: imageUrl,
      user_id: adminId, // Assign adminId to user_id
    };

    fetch('http://localhost:8080/Vegetable/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vegetable),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Vegetable added successfully!');
        navigate('/admin');
      })
      .catch((error) => {
        console.error('Error adding vegetable:', error);
        alert('Error adding vegetable. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vegetable Name:</label>
          <input
            type="text"
            value={vegetableName}
            onChange={(e) => setVegetableName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={vegetablePrice}
            onChange={(e) => setVegetablePrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={vegetableQuantity}
            onChange={(e) => setVegetableQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Vegetable</button>
      </form>
    </div>
  );
}

export default AddVegetableForm;
