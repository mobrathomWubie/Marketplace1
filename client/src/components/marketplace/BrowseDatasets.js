// src/components/marketplace/BrowseDatasets.js
import React, { useState, useEffect } from 'react';
import DatasetCard from './DatasetCard';
import Footer from '../Footer'; 
import '../../App.css';
const BrowseDatasets = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/datasets'); 
        if (!response.ok) {
          throw new Error('Failed to fetch datasets');
        }
        const data = await response.json();
        setDatasets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='browse-datasets'>
      <div className="content">
        <h1>Browse Datasets</h1>
        {loading && <p>Loading datasets...</p>}
        {error && <p>Error: {error}</p>}
        {datasets.map(dataset => <DatasetCard key={dataset._id} dataset={dataset} />)}
      </div>
      <Footer />
    </div>
  );
};

export default BrowseDatasets;
