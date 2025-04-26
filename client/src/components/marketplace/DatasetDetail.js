import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaDownload, FaStar, FaRegStar, FaChartLine, FaCalendarAlt, FaGlobe, FaFileAlt, FaUser, FaEnvelope } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './DatasetDetail.css';
import "./DatasetDetail.css"
const DatasetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchDataset = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockDataset = {
          id: id,         
          title: 'Agricultural Yields in East Africa (2023)',
          subtitle: 'Comprehensive dataset of crop production metrics across 5 East African countries.',
          description: 'Comprehensive dataset of crop production metrics across 5 East African countries. Includes maize, beans, coffee, and tea yields at district level.',
          category: 'Agriculture',
          price: 15,
          currency: 'USD',
          format: 'CSV',
          size: '45.7 MB',
          rows: '125,000',
          updatedAt: '2023-06-15',
          license: 'CC BY-SA 4.0',
          region: 'East Africa',
          coverage: 'Kenya, Tanzania, Uganda, Rwanda, Burundi',
          timePeriod: '2018-2022',
          frequency: 'Annual',
          downloads: 428,
          rating: 4.3,
          publisher: {
            name: 'East African Agricultural Research Institute',
            verified: true,
            joined: '2021-03-10'
          },
          columns: [
            'District', 'Country', 'Year', 
            'Crop Type', 'Yield (tons/ha)', 
            'Rainfall (mm)', 'Fertilizer Use'
          ],
          sampleData: [
            
            ['Kisumu', 'Kenya', '2022', 'Maize', '2.4', '1200', 'Medium'],
            ['Arusha', 'Tanzania', '2022', 'Beans', '1.2', '950', 'Low'],
            ['Gulu', 'Uganda', '2021', 'Coffee', '0.8', '1500', 'High']
          ],
          reviews: [
            {
              user: 'Research NGO',
              rating: 5,
              comment: 'Extremely valuable for our food security analysis',
              date: '2023-07-22'
            },
            {
              user: 'University Team',
              rating: 4,
              comment: 'Good coverage but some missing districts',
              date: '2023-05-10'
            }
          ]
        };
        
        setDataset(mockDataset);
        setPreviewData(mockDataset.sampleData.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError('Failed to load dataset');
        setLoading(false);
      }
    };

    fetchDataset();
  }, [id]);

  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading dataset:', id);
    // In real app: trigger download API call
  };

  const handlePurchase = () => {
    // Implement purchase logic
    navigate(`/checkout/${id}`);
  };

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    // Submit rating to backend
    console.log('Submitted rating:', { rating, review });
    // In real app: submit to API
    setRating(0);
    setReview('');
  };

  const handleContactCreator = () => {
    setShowContactForm(true);
  };

  const closeContactForm = () => setShowContactForm(false);

  if (loading) return (
    <div className="dataset-detail-container">
      <div className="dataset-header">
        <Skeleton height={40} width={200} />
        <Skeleton height={60} />
        <Skeleton height={30} width={150} />
      </div>
      <div className="dataset-meta">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} height={30} width={150} />
        ))}
      </div>
      <div className="tabs">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} height={40} width={100} />
        ))}
      </div>
    </div>
  );
  if (error) return <div className="error">{error}</div>;
  if (!dataset) return <div className="not-found">Dataset not found</div>

  return (
    <div className="dataset-detail-container">
      <div className="dataset-header">
        <div className="title-section">
          <h2>{dataset.subtitle}</h2>
          <h1>{dataset.title}</h1>
          <div className="publisher">
            <span>By {dataset.publisher.name}</span>
            {dataset.publisher.verified && <span className="verified-badge">Verified</span>}
          </div>
        </div>
        
        <div className="action-section">
          <div className="price-badge">
            {dataset.price === 0 ? (
              <span className="free">FREE</span>
            ) : (
              <span className="paid">{dataset.currency} {dataset.price}</span>
            )}
          </div>
          {dataset.price === 0 ? (
             <button onClick={handleDownload} className="download-button">
              <FaDownload /> Download
            </button>
          ) : (
            <button onClick={handlePurchase} className="purchase-button">
              Purchase Dataset
            </button>
          )}
          {dataset.publisher.name && (
            <button onClick={handleContactCreator} className="contact-creator-button">Contact Creator</button>
          )}
        </div>
      </div>

      <div className="dataset-meta">
        <div className="meta-item meta-item-1">
          <FaFileAlt />
          <span>{dataset.format} • {dataset.size}</span>
        </div>
        <div className="meta-item meta-item-2">
          <FaChartLine />
          <span>{dataset.rows} rows</span>
        </div>
        <div className="meta-item meta-item-3">
          <FaCalendarAlt />
          <span>Updated: {new Date(dataset.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="meta-item meta-item-4">
          <FaGlobe />
          <span>{dataset.region}</span>
        </div>
        <div className="meta-item rating meta-item-5">
          <div className="stars">
           {[1, 2, 3, 4, 5].map((star) => (
              star <= Math.floor(dataset.rating) ? 
                <FaStar key={star} className="filled" /> : 
                <FaRegStar key={star} />
            ))}
          </div>
          <span>{dataset.rating} ({dataset.reviews.length} reviews)</span>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={activeTab === 'preview' ? 'active' : ''}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button 
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({dataset.reviews.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="description-section">
            <p>{dataset.description}</p>
           
             <div className="dataset-info-section">
          
          <div className="info-grid">
              <div className="info-item">
                  <h3>Creator</h3>
                  <p>
                      <FaUser className="info-icon" /> 
                      {dataset.publisher.name}
                  </p>
              </div>
              <div className="info-item">
                  <h3>Category</h3>
                  <p>{dataset.category}</p>
              </div>
               <div className="info-item">
                  <h3>Size</h3>
                  <p>{dataset.size}</p>
              </div>
               <div className="info-item">
                  <h3>Data types</h3>
                  <p>{dataset.format}</p>
              </div>
               <div className="info-item">
                  <h3>License</h3>
                  <p>{dataset.license}</p>
               </div>
               
          </div>
        </div>
           <div className="details-grid"> <div className="detail-item">
                <h3>Geographic Coverage</h3>
                <p>{dataset.coverage}</p>
              </div>
              <div className="detail-item">
                <h3>Time Period</h3>
                <p>{dataset.timePeriod}</p>
              </div>
              <div className="detail-item">
                <h3>Update Frequency</h3>
                <p>{dataset.frequency}</p>
              </div>
            </div>

            <div className="columns-section">
              <h3>Data Columns</h3>
              <div className="columns-grid">
                {dataset.columns.map((column, index) => (
                  <span key={index} className="column-tag">{column}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="preview-section">
            <div className="preview-table-container">
              <table className="preview-table">
                <thead>
                  <tr>
                    {dataset.columns.slice(0, 5).map((col, i) => (
                      <th key={i}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="preview-note">Showing first 5 columns and 3 rows from the dataset</p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-section">
            {dataset.reviews.length > 0 ? (
              <>
                {dataset.reviews.map((review, i) => (
                  <div key={i} className="review-item">
                    <div className="review-header">
                      <span className="reviewer">{review.user}</span>
                      <div className="review-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          star <= review.rating ? 
                            <FaStar key={star} className="filled" /> : 
                            <FaRegStar key={star} />
                        ))}
                      </div>
                      <span className="review-date">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </>
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            )}

            <div className="add-review">
              <h3>Add Your Review</h3>
              <form onSubmit={handleRatingSubmit}>
                <div className="rating-input">
                  <span>Rating:</span>
                  <div className="stars-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star}
                        className={star <= rating ? 'filled' : ''}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with this dataset..."
                  rows="4"
                />
                <button type="submit" disabled={rating === 0}>
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="similar-datasets">
        <h2>Similar Datasets</h2>
        <div className="similar-list">
          {/* In real app, fetch similar datasets */}
          <div className="similar-item">
            <h3>West Africa Crop Production 2022</h3>
            <p>Similar coverage for West African countries</p>
            <span className="similar-price">FREE</span>
          </div>
          <div className="similar-item">
            <h3>East Africa Weather Patterns</h3>
            <p>Complementary weather data for same region</p>
            <span className="similar-price">$15</span>
          </div>
        </div>
      </div>
       {showContactForm && (
          <div className="contact-form-popup">
            <div className="contact-form-content">
              <button className="close-button" onClick={closeContactForm}>X</button>
              <h2>Contact Dataset Creator</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" rows="5"></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default DatasetDetail;