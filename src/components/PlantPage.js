import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm"; 
import PlantList from "./PlantList";
import Search from "./Search"; 

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data)) 
      .catch((error) => console.error("Failed to fetch plants:", error));
  }, []); 
  function addPlant(newPlant) {
    // Check if the new plant already exists in the plants array
    const plantExists = plants.some((plant) => plant.id === newPlant.id);
    
    if (plantExists) {
      // Show error if plant already exists
      alert("Error: Plant already exists.");
    } else {
      // Add new plant to the plants list and update the state
      setPlants([...plants, newPlant]);
      alert("Plant added successfully"); 
  }
}

  function updatePlant(updatedPlant) {
    const updatedPlants = plants.map((plant) =>
      plant.id === updatedPlant.id ? updatedPlant : plant
    );

    if (updatedPlants.every((plant) => plant.id !== updatedPlant.id)) {
      alert("Error: Plant  price update failed.");
    } else {
      setPlants(updatedPlants);
      alert("Plant price updated successfully"); 
    }
  }

  function deletePlant(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this plant?");
    
    if (isConfirmed) {
      const remainingPlants = plants.filter((plant) => plant.id !== id);
      
      if (remainingPlants.length === plants.length) {
        alert("Error: Plant  delete failed."); 
      } else {
        setPlants(remainingPlants);
        alert("Plant deleted successfully"); 
      }
    }
  }

  const handleSearchChange = (query) => setSearchQuery(query);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      {/* Render NewPlantForm to add new plants */}
      <NewPlantForm onAddPlant={addPlant} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList
        plants={filteredPlants}
        onUpdatePlant={updatePlant} 
        onDeletePlant={deletePlant} 
      />
    </main>
  );
}

export default PlantPage;