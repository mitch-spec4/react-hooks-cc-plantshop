import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
  if (!name || !image || !price) {
    alert("All fields are required!");
    return; 
  }
    const newPlant = { name, image, price: parseFloat(price) };

    fetch("http://localhost:6001/plants", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newPlant),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add plant. Please try again.");
      }
      return response.json();
    })
    .then((data) => onAddPlant(data)) // Call onAddPlant to update parent state
    .catch((error) => alert(error.message)); // Display error if API request fails

    setName("");
    setImage("");
    setPrice("");
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        {/* Input for the image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)} 
        />
        {/* Input for the plant price */}
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)} // Update price state on change
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;