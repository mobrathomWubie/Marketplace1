import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DatasetCard from './DatasetCard';
import './BrowseDatasets.css'

function TrendingDatasets() {
  const [trendingDatasets, setTrendingDatasets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingDatasets = async () => {
      try {
        const response = await fetch('/api/datasets/trending');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTrendingDatasets(data);
      } catch (error) {
        console.error('Failed to fetch trending datasets:', error);
      }
    };

    fetchTrendingDatasets();
  }, []);

  const handleCardClick = (datasetId) => {
    navigate(`/dataset/${datasetId}`);
  };

  return (
    <div className="browse-datasets-container">
      <div className="browse-datasets-header">
        <h2>Trending Datasets</h2>
      </div>
      <div className="datasets-grid">
        {trendingDatasets.map((dataset) => (
          <DatasetCard key={dataset._id} dataset={dataset} onClick={() => handleCardClick(dataset._id)} />
        ))}
      </div>
    </div>
  );
}

export default TrendingDatasets;