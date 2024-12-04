import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { FaStar, FaThumbsUp, FaCheck, FaUserCircle } from 'react-icons/fa';
import { useRating } from '../context/RatingContext';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { ratingStats, updateRatingStats } = useRating();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/seller/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
                calculateStats(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const calculateStats = (reviewData) => {
        const total = reviewData.length;
        const sum = reviewData.reduce((acc, review) => acc + review.rating, 0);
        const average = total ? (sum / total).toFixed(1) : 0;
        
        const distribution = reviewData.reduce((acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
        }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

        updateRatingStats({ average, total, distribution });
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar 
                key={index} 
                className={`star ${index < rating ? "filled" : ""}`} 
            />
        ));
    };

    const renderRatingBar = (rating, count) => {
        const percentage = ratingStats.total ? (count / ratingStats.total) * 100 : 0;
        return (
            <div className="rating-bar-container">
                <div className="rating-label">{rating} stars</div>
                <div className="rating-bar">
                    <div 
                        className="rating-fill" 
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div className="rating-count">{count}</div>
            </div>
        );
    };

    const formatDate = (date) => {
        const now = new Date();
        const reviewDate = new Date(date);
        const diffTime = Math.abs(now - reviewDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    return (
        <div className="det-content">
            <div className="reviews-header">
                <h1>Customer Reviews</h1>
            </div>
            
            <div className="reviews-overview">
                <div className="rating-summary">
                    <div className="average-rating">
                        <span className="rating-number">{ratingStats.average}</span>
                        <div className="rating-stars">
                            {renderStars(Math.round(ratingStats.average))}
                            <span className="total-reviews">
                                ({ratingStats.total} reviews)
                            </span>
                        </div>
                    </div>
                    <div className="rating-distribution">
                        {Object.entries(ratingStats.distribution)
                            .sort(([a], [b]) => b - a)
                            .map(([rating, count]) => renderRatingBar(rating, count))
                        }
                    </div>
                </div>
            </div>

            <div className="reviews-container">
                {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <div className="review-header">
                            <div className="reviewer-info">
                                {review.reviewerImage ? (
                                    <img 
                                        src={review.reviewerImage} 
                                        alt={review.reviewerName} 
                                        className="reviewer-image"
                                    />
                                ) : (
                                    <FaUserCircle className="reviewer-icon" />
                                )}
                                <div className="reviewer-details">
                                    <span className="reviewer-name">
                                        {review.reviewerName}
                                        {review.verified && (
                                            <FaCheck className="verified-badge" />
                                        )}
                                    </span>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </div>
                            <div className="review-date">
                                {formatDate(review.createdAt)}
                            </div>
                        </div>
                        <div className="review-content">
                            <p className="review-message">{review.message}</p>
                        </div>
                        <div className="review-footer">
                            <button className="helpful-button">
                                <FaThumbsUp /> Helpful ({review.helpful})
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews; 