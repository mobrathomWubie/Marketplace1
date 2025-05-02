import React from "react";
import "./DatasetCard.css";

function DatasetCard({ dataset }) {
  if (!dataset) {
    return <div>Loading dataset...</div>;
  }

  const { title, description, category, price, imageUrl } = dataset;

  return (
    <div className="dataset-card">
      <img
        src={imageUrl || "placeholder-image-url.jpg"}
        alt={title}
        className="dataset-card-image"
      />
      <div className="dataset-card-content">
        <h3 className="dataset-card-title">{title}</h3>
        <p className="dataset-card-category">Category: {category}</p>
        <p className="dataset-card-description">{description}</p>
        <div className="dataset-card-price-buy">
          <p className="dataset-card-price">${price}</p>
          <button className="dataset-card-buy-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default DatasetCard;