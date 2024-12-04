import React, { createContext, useContext, useState } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
    const [ratingStats, setRatingStats] = useState({
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });

    const updateRatingStats = (stats) => {
        setRatingStats(stats);
    };

    return (
        <RatingContext.Provider value={{ ratingStats, updateRatingStats }}>
            {children}
        </RatingContext.Provider>
    );
};

export const useRating = () => useContext(RatingContext); 