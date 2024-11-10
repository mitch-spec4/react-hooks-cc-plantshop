import React from "react";

// Search component allows users to search for plants by name
function Search({ onSearchChange }) {
  return (
    <div className="searchbar">
      {/* Label for the search input field */}
      <label htmlFor="search">Search Plants:</label>

      <input
        type="text" 
        id="search" 
        placeholder="Type a name to search..." 
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;