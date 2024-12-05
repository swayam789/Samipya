import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SellerProfile.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaStore, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import ProductModal from '../pages/ProductModal';

// Define API_URL constant
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Add renderStars function
const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
        <FaStar 
            key={index} 
            className={`star ${index < rating ? "filled" : ""}`} 
        />
    ));
};

const SellerProfile = () => {
    const { _id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [ratingStats, setRatingStats] = useState({
        average: 0,
        total: 0
    });

    useEffect(() => {
        const fetchSellerProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/sellers/${_id}`);
                setUserData(response.data);
                
                // Fetch seller's products
                const productsResponse = await axios.get(`${API_URL}/api/products/seller/${_id}`);
                setProducts(productsResponse.data);
                
                setLoading(false);

                try {
                    const ratingsResponse = await axios.get(`${API_URL}/api/sellers/${_id}/ratings`);
                    setRatingStats(ratingsResponse.data);
                } catch (ratingError) {
                    console.error('Error fetching ratings:', ratingError);
                }
            } catch (err) {
                setError('Failed to load seller profile');
                setLoading(false);
            }
        };

        fetchSellerProfile();
    }, [_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return <div>Seller not found</div>;

    return (
      <div className="profile-container">
          <div className="profile-left">
              <div className="profile-image-container">
                  <img 
                      src={userData?.profileImage 
                          ? `${API_URL}/api/users/image/${userData.profileImage}`
                          : '/images/default-profile.jpg'
                      } 
                      alt="Profile" 
                      className="profile-image" 
                      onError={(e) => {
                          console.error('Image load error:', e);
                          e.target.src = '/images/default-profile.jpg';
                      }}
                  />
              </div>
              <div className="profile-info">
                  <h2>{userData.username}</h2>
                  <p>Shop's Name: {userData.shopName}</p>
                  <p>Location: {userData.location}</p>
                  <p>Contact: {userData.contact}</p>
                  <p>Email: {userData.email}</p>
                  <p>Landmarks: {userData.landmarks}</p>
                  <p>Rating: 
                      <span className="rating-display">
                          <span className="rating-number1">{ratingStats.average || "0"}</span>
                          <div className="rating-stars1">
                              {renderStars(Math.round(ratingStats.average || 0))}
                          </div>
                          <span className="total-reviews">
                              ({ratingStats.total} reviews)
                          </span>
                      </span>
                  </p>
              </div>
              <div className="profile-description">
                  <h3>Description</h3>
                  <p>{userData.description}</p>
              </div>
          </div>
          
          <div className="profile-right">
              <div className='profile-section'>
                      <h2>Products</h2>
                      <div className='products-container4'>
                          {products.map((product) => (
                              <div 
                                  key={product._id} 
                                  className="product-card4"
                                  onClick={() => {
                                      setSelectedProduct(product);
                                      setShowModal(true);
                                  }}
                              >
                                  <img 
                                      src={product.imagePath && product.imagePath.length > 0 
                                          ? `${API_URL}/uploads/${product.imagePath}`
                                          : '/images/placeholder-image.png'
                                      }
                                      alt={product.name}
                                      onError={(e) => {
                                          console.error('Error loading product image:', e);
                                          e.target.src = '/images/placeholder-image.png';
                                      }}
                                  />
                                  <div className="product-info4">
                                      <h3>{product.name}</h3>
                                      <p className="price4">₹{product.price}</p>
                                      <p className="description4">{product.description}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
              </div>
              <div className="profile-section">
                  <h2>Location on Map</h2>
                  <div className="location-map">
                  <MapContainer 
                              center={[userData.latitude, userData.longitude]} 
                              zoom={13} 
                              style={{ height: '300px', width: '100%' }}
                          >
                              <TileLayer
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              />
                              <Marker position={[userData.latitude, userData.longitude]}>
                                  <Popup>
                                      {userData.shopName || 'Swayam'}<br/>
                                      {userData.location}
                                  </Popup>
                              </Marker>
                          </MapContainer>
                  </div>
              </div>
              
              <div className="profile-section">
            
              </div>
          </div>
          {showModal && (
              <ProductModal 
                  product={selectedProduct}
                  sellerLocation={userData}
                  onClose={() => setShowModal(false)}
              />
          )}
      </div>
    );
};

export default SellerProfile;