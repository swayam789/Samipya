const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const reviewService = {
    getReviews: async () => {
        const response = await fetch(`${API_URL}/seller/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return response.json();
    },

    addReview: async (reviewData) => {
        const response = await fetch(`${API_URL}/seller/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) throw new Error('Failed to add review');
        return response.json();
    },

    updateReview: async (id, reviewData) => {
        const response = await fetch(`${API_URL}/seller/reviews/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) throw new Error('Failed to update review');
        return response.json();
    },

    deleteReview: async (id) => {
        const response = await fetch(`${API_URL}/seller/reviews/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete review');
        return response.json();
    }
}; 