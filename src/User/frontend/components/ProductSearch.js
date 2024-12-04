import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaRupeeSign, FaMapMarkerAlt, FaStore } from 'react-icons/fa';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('All Categories');
  const location_url = useLocation();
  const [error, setError] = useState(null);

  const categories = [
    "All Categories",
    "Fashion",
    "Electronics",
    "Food & Beverages",
    "Home & Living",
    "Health & Beauty",
    "Books & Stationery",
    "Sports & Fitness",
    "Music & Instruments",
    "Toys & Games",
    "Automotive",
    "Gifts & Occasions",
    "Other"
  ];

  useEffect(() => {
    const params = new URLSearchParams(location_url.search);
    const queryParam = params.get('query');
    const locationParam = params.get('location');
    
    if (queryParam && locationParam) {
      setSearchQuery(queryParam);
      setLocation(locationParam);
      handleSearch(queryParam, locationParam);
    }
  }, [location_url]);

  const handleSearch = async (query = searchQuery, loc = location) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Searching with params:', { query, loc });
      
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}`
      );
      
      if (!geocodeResponse.data.length) {
        throw new Error('Location not found');
      }

      const { lat, lon } = geocodeResponse.data[0];
      console.log('Geocoded coordinates:', { lat, lon });

      const response = await axios.get(`/user/api/products/search`, {
        params: {
          query,
          latitude: lat,
          longitude: lon
        }
      });

      console.log('Products received:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      setError(error.message);
      alert('Error searching products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a log when products state changes
  useEffect(() => {
    console.log('Products state updated:', products);
  }, [products]);

  // Add data validation before rendering
  const validateProduct = (product) => {
    const required = ['_id', 'name', 'price', 'seller'];
    return required.every(field => product[field]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Search Products</h2>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(validateProduct).map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {console.log('Rendering product:', product)}
                
                {product.imagePath && (
                  <img
                    src={`/uploads/${product.imagePath}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex items-center mb-2">
                    <FaRupeeSign className="text-green-600" />
                    <span className="text-xl font-bold text-green-600">{product.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{(product.distance / 1000).toFixed(2)} km away</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaStore className="mr-1" />
                    <span>{product.seller?.name || 'Unknown Seller'}</span>
                  </div>
                  {product.stock <= 5 && product.stock > 0 && (
                    <p className="text-orange-500 text-sm mt-2">Only {product.stock} left in stock!</p>
                  )}
                  {product.stock === 0 && (
                    <p className="text-red-500 text-sm mt-2">Out of stock</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">No products found. Try adjusting your search criteria.</p>
          </div>
        )}
        {error && (
          <div className="text-center py-4">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch; 