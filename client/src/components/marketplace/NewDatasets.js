import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import DatasetCard from './DatasetCard'; // Import DatasetCard
import './BrowseDatasets.css'

function NewDatasets() {
  const [newDatasets, setNewDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewDatasets = async () => {
      try {
        const response = await fetch('/api/datasets'); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch new datasets');
        }
        const data = await response.json();
        setNewDatasets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewDatasets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="browse-datasets-container">
      <Link to="/NewDatasets"><h2>New Datasets</h2></Link>
      <div className="datasets-grid">
        {newDatasets.map(dataset => (
          <DatasetCard key={dataset._id} dataset={dataset} />
        ))}
      </div>
    </div>
  );
}

export default NewDatasets;