import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './MyDatasets.css';

const MyDatasets = () => {
  const [purchasedDatasets, setPurchasedDatasets] = useState([]);
  const [createdDatasets, setCreatedDatasets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setPurchasedDatasets(user.purchasedDatasets || []);
      setCreatedDatasets(user.createdDatasets || []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  const handleViewDataset = (datasetId) => {
    navigate(`/dataset/${datasetId}`);
  };

  return (
    <div className="my-datasets-container">
      <h1 className="my-datasets-title">My Datasets</h1>

      <div className="datasets-section">
        <h2 className="datasets-subtitle">Purchased Datasets</h2>
        {isLoading ? (
          <div className="skeleton-list">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <Skeleton height={40} />
              </div>
            ))}
          </div>
        ) : purchasedDatasets.length === 0 ? (
          <p className="empty-message">No datasets purchased yet.</p>
        ) : (
          <ul className="datasets-list">
            {purchasedDatasets.map((dataset) => (
              <li key={dataset._id} className="datasets-item">
                <span className="dataset-name">{dataset.name}</span>
                <button className="view-button" onClick={() => handleViewDataset(dataset._id)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="datasets-section">
        <h2 className="datasets-subtitle">Created Datasets</h2>
        {isLoading ? (
          <div className="skeleton-list">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <Skeleton height={40} />
              </div>
            ))}
          </div>
        ) : createdDatasets.length === 0 ? (
          <p className="empty-message">No datasets created yet.</p>
        ) : (
          <ul className="datasets-list">
            {createdDatasets.map((dataset) => (
              <li key={dataset._id} className="datasets-item">
                <span className="dataset-name">{dataset.name}</span>
                <button className="view-button" onClick={() => handleViewDataset(dataset._id)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyDatasets;