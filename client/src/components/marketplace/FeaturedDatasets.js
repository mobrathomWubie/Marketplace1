import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatasetCard from './DatasetCard';
import './BrowseDatasets.css';

function FeaturedDatasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedDatasets = async () => {
      try {
        const response = await fetch('/api/datasets/featured');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDatasets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedDatasets();
  }, []);
  return (
    <div className="browse-datasets-container">
      <Link to="/FeaturedDatasets"><h2>Featured Datasets</h2></Link>
       {loading && <p>Loading featured datasets...</p>}
      {error && <p>Error: {error}</p>}
      <div className="datasets-grid">
        {datasets.map((dataset) => <DatasetCard key={dataset._id} dataset={dataset} />)}
      </div>
    </div>
  );
}

export default FeaturedDatasets;