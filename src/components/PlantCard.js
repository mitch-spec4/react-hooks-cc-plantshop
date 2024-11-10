import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [price, setPrice] = useState(plant.price);
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handlePriceChange = (e) => setPrice(e.target.value);

  const handleUpdatePrice = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ price: parseFloat(price) })
    })
    .then((r) => {
      if (!r.ok) {
        throw new Error("Failed to update plant price. Please try again.");
      }
      return r.json();
    })
    .then((updatedPlant) => onUpdatePlant(updatedPlant)) 
    .catch((error) => alert(error.message)); 
};

  const handleDeleteClick = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE" 
    })
    .then((r) => {
      if (!r.ok) {
        throw new Error("Failed to delete plant. Please try again.");
      }
      onDeletePlant(plant.id); 
    })
    .catch((error) => alert(error.message)); 
};

  return (
    <div className="card">
      {/* Display plant's image */}
      <img src={plant.image} alt={plant.name} />

      {/* Display plant's name */}
      <h4>{plant.name}</h4>

      {/* Display and update plant's price */}
      <p>Price: ${price}</p>
      <input
        type="number"
        value={price} 
        onChange={handlePriceChange} 
      />
      
      <button onClick={handleUpdatePrice} style={{ backgroundColor: "black", color:"white" }}>
        Update Price
      </button>

      {/* Button to toggle plant stock status */}
      <button className={isSoldOut ? "sold-out-button" : "primary-button"} onClick={() => setIsSoldOut(!isSoldOut)}>
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>

      {/* Button to delete the plant */}
      <button onClick={handleDeleteClick} style={{ backgroundColor: '#8B5E3C' }}>
        Delete
      </button>
    </div>
  );
}

export default PlantCard;