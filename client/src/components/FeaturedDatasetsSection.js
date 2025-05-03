import React from 'react';
import './FeaturedDatasetsSection.css';

const datasets = [
  {
    id: 1,
    title: 'Dataset 1: Environmental Data',
    description: 'Comprehensive environmental data collected over a decade.',
    details: 'Includes temperature, humidity, and pollution levels.',
    author: 'EcoWatch',
  },
  {
    id: 2,
    title: 'Dataset 2: Financial Market Trends',
    description: 'Real-time and historical financial market data.',
    details: 'Covers stock prices, trading volumes, and economic indicators.',
    author: 'FinData Inc.',
  },
  {
    id: 3,
    title: 'Dataset 3: Healthcare Statistics',
    description: 'Anonymized healthcare statistics for research purposes.',
    details: 'Contains patient demographics, diagnoses, and treatment data.',
    author: 'HealthMetrics',
  },
];

const FeaturedDatasetsSection = () => {
  return (
      <section className="featured-datasets-section">
          <h2 className="section-title">Featured Datasets</h2>
          <div className="datasets-container">
              {datasets.map((dataset) => (
                  <div key={dataset.id} className="dataset-item">
                      <h3 className="dataset-title">{dataset.title}</h3>
                      <p className="dataset-description">{dataset.description}</p>
                      <p className="dataset-details">{dataset.details}</p>
                      <p className="dataset-author">By: {dataset.author}</p>
                  </div>
              ))}
          </div>
      </section>
  );
};

export default FeaturedDatasetsSection;
    </div>
  );
};

export default FeaturedDatasetsSection;
import React from 'react';
import './FeaturedDatasetsSection.css';

const FeaturedDatasetsSection = () => {
  return (
    <div className="featured-datasets-section">
      <h2 className="section-title">Featured Datasets</h2>
      <div className="datasets-container">
        <div className="dataset-placeholder">
          <h3 className="dataset-title">Dataset 1</h3>
          <p className="dataset-description">Brief description of Dataset 1.</p>
        </div>
        <div className="dataset-placeholder">
          <h3 className="dataset-title">Dataset 2</h3>
          <p className="dataset-description">Brief description of Dataset 2.</p>
        </div>
        <div className="dataset-placeholder">
          <h3 className="dataset-title">Dataset 3</h3>
          <p className="dataset-description">Brief description of Dataset 3.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDatasetsSection;