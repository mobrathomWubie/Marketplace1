import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Reviews({ datasetId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/datasets/${datasetId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [datasetId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(`/api/datasets/${datasetId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ review: newReview, rating: newRating }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      const data = await response.json();
      setReviews([...reviews, data]);
      setNewReview('');
      setNewRating(5);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="reviews-container">
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              <p className="review-user">User: {review.user}</p>
              <p className="review-rating">Rating: {review.rating}</p>
              <p className="review-text">{review.review}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      {user && (
        <form onSubmit={handleSubmitReview} className="review-form">
          <div className="form-group">
            <label htmlFor="review">Your Review:</label>
            <textarea
              id="review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5):</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      )}
       {!user && (
         <p>Login to add a review</p>
       )}
    </div>
  );
}

export default Reviews;