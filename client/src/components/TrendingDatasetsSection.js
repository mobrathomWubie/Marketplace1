import React from 'react';
import './TrendingDatasetsSection.css';


const TrendingDatasetsSection = () => {
  const trendingDatasets = [
    { id: 1, title: 'Global Weather Patterns', description: 'Detailed weather data from around the world.', category: 'Environment', updateFrequency: 'Daily' },
    { id: 2, title: 'Social Media Trends', description: 'Real-time analysis of trending topics on social media.', category: 'Social', updateFrequency: 'Hourly' },
    { id: 3, title: 'Stock Market Fluctuations', description: 'Up-to-the-minute stock market data and analysis.', category: 'Finance', updateFrequency: 'Minute' },
    { id: 4, title: 'E-commerce Sales Data', description: 'Comprehensive sales data from various online retailers.', category: 'Retail', updateFrequency: 'Daily' },
    { id: 5, title: 'Traffic Flow in Major Cities', description: 'Live traffic data from major urban centers.', category: 'Urban', updateFrequency: 'Real-time' },
  ];

  return (
    <div className="trending-datasets-container">
      <h2 className="trending-datasets-title">Trending Datasets</h2>
      <div className="trending-datasets-list">
        {trendingDatasets.map((dataset) => (
          <div key={dataset.id} className="dataset-card">
            <h3 className="dataset-card-title">{dataset.title}</h3>
            <p className="dataset-card-description">{dataset.description}</p>
            <div className="dataset-card-details">
                <span>Category: {dataset.category}</span>
                <span>Update: {dataset.updateFrequency}</span>
          </div>
        ))}
      </div>
    </div> 
  );
};

export default TrendingDatasetsSection;
import React from 'react';
import './TrendingDatasetsSection.css';

const TrendingDatasetsSection = () => {
  const trendingDatasets = [
    { id: 1, title: 'Trending Dataset 1', description: 'Description for Trending Dataset 1' },
    { id: 2, title: 'Trending Dataset 2', description: 'Description for Trending Dataset 2' },
    { id: 3, title: 'Trending Dataset 3', description: 'Description for Trending Dataset 3' },
  ];

  return (
    <div className="trending-datasets-container">
      <h2 className="trending-datasets-title">Trending Datasets</h2>
      <div className="trending-datasets-list">
        {trendingDatasets.map(dataset => (
          <div key={dataset.id} className="trending-dataset-item">
            <h3 className="dataset-title">{dataset.title}</h3>
            <p className="dataset-description">{dataset.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingDatasetsSection;