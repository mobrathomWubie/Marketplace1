import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Log the search term to the console
    console.log("Searching for:", searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="search-input" // Class name for styling the input
        placeholder="Search for datasets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit" className="search-button">
        Search {/* Text displayed on the button */}
      </button>
    </form>
  );
}

export default SearchBar;