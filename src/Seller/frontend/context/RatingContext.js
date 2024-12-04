import React, { createContext, useContext, useState } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
    const [ratingStats, setRatingStats] = useState({
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    });

    const updateRatingStats = (newStats) => setRatingStats(newStats);

    return (
        <RatingContext.Provider value={{ ratingStats, updateRatingStats }}>
            {children}
        </RatingContext.Provider>
    );
};

export const useRating = () => {
    const context = useContext(RatingContext);
    if (!context) {
        throw new Error('useRating must be used within a RatingProvider');
    }
    return context;
};
