import React, { useState, useEffect } from 'react';
import './BrowseDatasets.css';

const DatasetDetail = ({ match }) => {
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataset = async () => {
      const { datasetId } = match.params;
      try {
        const response = await fetch(`/api/datasets/${datasetId}`);
        if (!response.ok) throw new Error('Dataset not found!');
        const data = await response.json();
        setDataset(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataset();
  }, [match.params]);

  if (loading) return <div className="dataset-detail-loading">Loading...</div>;
  if (error) return <div className="dataset-detail-error">Error: {error}</div>;
  if (!dataset) return <div className="dataset-detail-not-found">Dataset not found!</div>;

  return (
    <div className="dataset-detail-container">
      <h1 className="dataset-detail-title">{dataset.title}</h1>
      <p className="dataset-detail-description">{dataset.description}</p>
    </div>
  );
};

export default DatasetDetail;