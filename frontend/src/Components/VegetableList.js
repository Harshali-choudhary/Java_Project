import React from 'react';
import './VegetableList.css';

function VegetableList({ vegetables }) {
  return (
    <div className="vegetable-list row">
      {vegetables.map(veg => (
        <div key={veg.vegetable_id} className="col-4 mb-4">
          <div className="card">
            <img src={veg.image_url} alt={veg.vegetable_name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{veg.vegetable_name}</h5>
              <p className="card-text">Price: {veg.vegetable_price}</p>
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VegetableList;
