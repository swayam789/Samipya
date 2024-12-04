import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaRupeeSign, FaMapMarkerAlt, FaStore, FaSearch, FaPhone, FaEnvelope} from 'react-icons/fa';
import './ProductsPage.css';

/**
 * ProductsPage Component
 * Displays search results for products based on query and location
 * Handles geocoding of location and fetches nearby products
 */
const ProductsPage = () => {
    // State management for products, loading state, errors, and search parameters
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({ query: '', location: '' });
    const location = useLocation();

    /**
     * Effect hook to handle URL search parameters
     * Extracts query and location from URL and triggers product search
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        const locationParam = params.get('location');
        
        if (query && locationParam) {
            setSearchParams({ query, location: locationParam });
            searchProducts(query, locationParam);
        }
    }, [location.search]);

    /**
     * Searches for products based on query and location
     * @param {string} query - Search term for products
     * @param {string} locationParam - Location string to be geocoded
     */
    const searchProducts = async (query, locationParam) => {
        try {
            setLoading(true);
            setError(null);
            
            // Log location parameter for debugging
            console.log('Location parameter:', locationParam);
            
            // Geocode the location string to coordinates
            const geocodeResponse = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationParam)}`
            );

            if (!geocodeResponse.data.length) {
                throw new Error('Location not found. Please check the address and try again.');
            }

            // Log geocoding response for debugging
            console.log('Geocoding response:', geocodeResponse.data[0]);

            const { lat, lon } = geocodeResponse.data[0];
            
            // Make API call to backend with coordinates
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            try {
                console.log('Sending coordinates to API:', { lat, lon });
                
                const response = await axios.get(`${API_URL}/user/api/products/search`, {
                    params: {
                        query,
                        latitude: lat,
                        longitude: lon
                    }
                });
                setProducts(response.data);
            } catch (apiError) {
                console.error('API Error:', apiError.response?.data || apiError.message);
                throw new Error('Failed to fetch products. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error searching products');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Constructs the full URL for product images
     * @param {string} imagePath - Relative path to the image
     * @returns {string|null} Full URL to the image or null if no path provided
     */
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        return `${API_URL}/uploads/${imagePath}`;
    };
    if (error)
    {
        return (<div>Error loading</div>);
    }
    return (
        <div className="page-wrapper2">
            <div className="header2">
                <div className="header-content2">
                    <h1 className="main-title2">
                        Search Results for "{searchParams.query}"
                    </h1>
                    <p className="location2">
                        <FaMapMarkerAlt className="icon" />
                        Showing products near {searchParams.location}
                    </p>
                </div>
            </div>

            <div className="content2">
                {loading ? (
                    <div className="loading2">
                        <div className="spinner2"></div>
                        <p className="loading-text2">Finding products near you...</p>
                    </div>
                ) : products.length > 0 ? (
                    <>
                        <div className="results-summary2">
                            <p className="count2">
                                Found {products.length} products matching your search
                            </p>
                        </div>
                        <div className="products-grid2">
                            {products.map((product) => (
                                <div key={product._id} className="product-card2">
                                    <div className="image-container2">
                                        {product.imagePath ? (
                                            <img
                                                src={getImageUrl(product.imagePath)}
                                                alt={product.name}
                                                className="product-image2"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="no-image2">
                                                <span>No image available</span>
                                            </div>
                                        )}
                                        {product.stock <= 5 && (
                                            <div className="stock-badge2">
                                                {product.stock} left
                                            </div>
                                        )}
                                    </div>
                                    <div className="product-details2">
                                        <h3 className="title2">{product.name}</h3>
                                        <p className="description2">{product.description}</p>
                                        <p className="description2">Category: {product.category}</p>
                                        <FaPhone className="icon3" />
                                        <span>{product.seller?.contact}</span><br/>
                                        <FaEnvelope className="icon3" />
                                        <span>{product.seller?.email}</span>
                                        <div className="meta2">
                                            <div className="price2">
                                                <FaRupeeSign className="icon2" />
                                                <span>{product.price}</span>
                                            </div>
                                            <div className="distance2">
                                                <FaMapMarkerAlt className="icon2" />
                                                <span>{(product.distance / 1000).toFixed(2)} km</span>
                                            </div>
                                        </div>
                                        <div className="seller2">
                                            <FaStore className="icon2" />
                                            <span>{product.seller?.shopName || 'Swayam'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">
                            <FaSearch />
                        </div>
                        <h2 className="no-results-title">No products found</h2>
                        <p className="no-results-message">
                            Try adjusting your search or location to find more products
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage; 