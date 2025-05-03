import React from 'react';
import './NewDatasetsSection.css';


const NewDatasetsSection = () => {
  const newDatasets = [
    { 
      id: 1, 
      title: 'Public Health Survey Data', 
      description: 'Comprehensive data collected from a recent public health survey.', 
      publisher: 'National Health Institute', 
      dateAdded: '2023-11-15' 
    },
    { 
      id: 2, 
      title: 'E-commerce Sales Trends', 
      description: 'Detailed sales data from our e-commerce platform.', 
      publisher: 'Tech Retailers Inc.', 
      dateAdded: '2023-11-10' 
    },
    { 
      id: 3, 
      title: 'Climate Change Observations', 
      description: 'Data set of climate measurements from various locations.', 
      publisher: 'Global Climate Watch', 
      dateAdded: '2023-11-05' 
    },
  ];
  return (
    <div className="new-datasets-section">
      <h2 className="new-datasets-title">New Datasets</h2>
      <div className="new-datasets-list">
        {newDatasets.map(dataset => (<div key={dataset.id} className="dataset-placeholder"><h3 className="dataset-title">{dataset.title}</h3><p className="dataset-description">{dataset.description}</p><p className="dataset-publisher">Publisher: {dataset.publisher}</p><p className="dataset-date">Date Added: {dataset.dateAdded}</p></div>))}
      </div>
    </div>
  );
};
export default NewDatasetsSection;
import React from 'react';
import './NewDatasetsSection.css';

const NewDatasetsSection = () => {
  const newDatasets = [
    { id: 1, title: 'Dataset 1', description: 'Description for Dataset 1.' },
    { id: 2, title: 'Dataset 2', description: 'Description for Dataset 2.' },
    { id: 3, title: 'Dataset 3', description: 'Description for Dataset 3.' },
  ];

  return (
    <div className="new-datasets-section">
      <h2 className="new-datasets-title">New Datasets</h2>
      <div className="new-datasets-list">
        {newDatasets.map((dataset) => (
          <div key={dataset.id} className="dataset-placeholder">
            <h3 className="dataset-title">{dataset.title}</h3>
            <p className="dataset-description">{dataset.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewDatasetsSection;