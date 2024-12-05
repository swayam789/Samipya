import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaRupeeSign, FaStore, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductModal = ({ product, sellerLocation, onClose }) => {
    if (!product || !sellerLocation) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="modal-body">
                    <div className="product-details-container">
                        <img 
                            src={product.imagePath ? `http://localhost:5000/uploads/${product.imagePath}` : '/images/placeholder-image.png'} 
                            alt={product.name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/placeholder-image.png';
                            }}
                            className="modal-product-image"
                        />
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className="description1">{product.description}</p>
                            <p className="price"><FaRupeeSign /> {product.price}</p>
                            <p className="stock">Stock: {product.stock}</p>
                            <p className="category">Category: {product.category}</p>
                            <div className="seller-info">
                                <h3>Seller Information</h3>
                                <Link to={`/user/seller-profile/${product.sellerId}`}>
                                    <p><FaStore /> {product.seller?.shopName || 'Swayam'}</p>
                                </Link>
                                <p><FaPhone /> {product.seller?.contact || 'No number'}</p>
                                <p><FaEnvelope /> {product.seller?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="map-container">
                        <MapContainer 
                            center={[sellerLocation.latitude, sellerLocation.longitude]} 
                            zoom={13} 
                            style={{ height: '300px', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[sellerLocation.latitude, sellerLocation.longitude]}>
                                <Popup>
                                    {product.seller?.shopName || 'Swayam'}<br/>
                                    {sellerLocation.address}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal; 