import React, { useState, useEffect } from 'react';
import './Home.css';
import DatasetCategories from './DatasetCategories';
import SearchBar from './SearchBar';
import NewDatasets from './NewDatasets';

// Home component for the main landing page
const Home = () => {
  const [newDatasets, setNewDatasets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      fetch('/api/datasets?new=true')
      .then(response => response.json())
      .then(data => setNewDatasets(data))
      .catch(error => console.error('Error fetching new datasets:', error));

      fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
      <div className="home">
        <SearchBar />
        <DatasetCategories categories={categories} />
        <NewDatasets datasets={newDatasets} />
      </div>
  );
};

export default Home;