import React from 'react';
import { Link } from 'react-router-dom';
import './DatasetCard.css';

const DatasetCard = ({ dataset }) => {
  return (
    <div className="dataset-card">
      <div className="dataset-card-header">
          <h3 className='dataset-card-title'>{dataset.title}</h3>
        </div>
      <div className='dataset-card-body'>
        <p className="dataset-card-description">{dataset.description.substring(0, 100)}...</p>
        <div className='dataset-card-details'>
          <p className='dataset-card-details-item'>
            <span className='dataset-card-details-label'>Data Types:</span> {dataset.dataTypes ? dataset.dataTypes.join(', ') : 'N/A'}
          </p>
          <p className='dataset-card-details-item'>
            <span className='dataset-card-details-label'>Size:</span> {dataset.size ? dataset.size : 'N/A'}
          </p>
          <p className='dataset-card-details-item'>
            <span className='dataset-card-details-label'>Creator:</span> {dataset.creator ? dataset.creator : 'N/A'}
          </p>
        </div>
      </div>
      <div className="dataset-card-footer">
        <span className={`price ${dataset.price === 0 ? 'free' : 'paid'}`}>
          {dataset.price === 0 ? 'FREE' : `$${dataset.price}`}
        </span>
        <button className="preview-button">Preview</button>
        <button className="add-to-cart-button">Add to Cart</button>
        <Link to={`/datasets/${dataset._id}`} className='details-link'>Details</Link>
      </div>
    </div>
  );
};

export default DatasetCard;