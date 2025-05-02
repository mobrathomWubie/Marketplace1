import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import DatasetCard from './DatasetCard'; // Import DatasetCard
import './BrowseDatasets.css';

function DatasetCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/datasets/categories'); // Fetch categories from the server
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data); // Set the categories
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="browse-datasets-container">
        <h2>Dataset Categories</h2>
      <div className="datasets-grid">
      {categories.map((category, index) => (
          <DatasetCard key={index} dataset={category}/>
        ))}
      </div>
    </div>
  );
}

export default DatasetCategories;
