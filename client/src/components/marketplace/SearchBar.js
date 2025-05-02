import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      fetchSearchResults(query);
    }
  }, [searchParams]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`/api/datasets/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSearchResults(searchTerm);
    navigate(`/SearchResults?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" placeholder="Search datasets..." value={searchTerm} onChange={(e) => {
          setSearchTerm(e.target.value);
        }} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
