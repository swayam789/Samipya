import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';
import { FaCamera, FaStar } from 'react-icons/fa';
import {FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRating } from '../context/RatingContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const API_URL = 'http://localhost:5000';

const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
        <FaStar 
            key={index} 
            className={`star ${index < rating ? "filled" : ""}`} 
        />
    ));
};

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {user} = useAuth();
    const [showImageModal, setShowImageModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const { ratingStats } = useRating();

    useEffect(() => {
        if (!user) {
            setError('User not authenticated');
            navigate('/login');
            return;
        }
        setUserData(user);
        setLoading(false);
    }, [navigate, user]);

    const handleImageChange = async (id, file) => {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const token = localStorage.getItem('seller_token');
        
        const formData = new FormData();
        formData.append('profileImage', file); // Add the file to the FormData object
    
        try {
            const response = await fetch(`${API_URL}/seller/profile/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // Send FormData containing the image
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Profile image updated successfully:', data);
                setUserData(prevUserData => ({
                    ...prevUserData,
                    profileImage: data.seller.profileImage, // Update the profileImage in the state
                }));
            } else {
                const errorData = await response.json();
                console.error('Error updating profile image:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            handleImageChange(userData._id, file); // Call handleImageChange with the file and seller ID
        }
    };
    

    const handlePhotoUpload = async () => {
        const file = previewUrl;
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            formData.append('userId', user._id);
            
            try {
                const response = await fetch('http://localhost:5000/api/users/upload-photo', {
                    method: 'PUT',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    setUserData(prev => ({
                        ...prev,
                        uploadedPhotos: [...prev.uploadedPhotos, data.photoPath]
                    }));
                    
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    localStorage.setItem('user', JSON.stringify({
                        ...currentUser,
                        uploadedPhotos: [...currentUser.uploadedPhotos, data.photoPath]
                    }));
                    
                    setShowPhotoModal(false);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to upload photo');
                }
            } catch (error) {
                console.error('Error uploading photo:', error);
                alert(error.message || 'Failed to upload photo. Please try again.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userData) return <div>No user data found</div>;

    return (
        <>
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
                    <div className="image-overlay">
                        <label 
                            className="change-image-label"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowImageModal(true);
                            }}
                        >
                            <FaCamera /> Change Image
                        </label>
                    </div>
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
                <div className="profile-section">
                    <h2>Uploaded Photos</h2>
                    <div className="uploaded-photos">
                        {userData.uploadedPhotos && userData.uploadedPhotos.map((photo, index) => (
                            <div key={index} className="uploaded-photo-container">
                                <img src={photo} alt="" className="uploaded-photo" />
                                <button className="remove-photo">Remove</button>
                            </div>
                        ))}
                        <div className="uploaded-photo-container">
                            <img src="/images/placeholder.png" alt="" className="uploaded-photo" />
                            <button className="Add-ph" onClick={() => setShowPhotoModal(true)}>
                                <FaCamera /> Add Photo
                            </button>
                        </div>
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
            
            {showImageModal && (
                <div className="image-upload-modal">
                    <div className="modal-content">
                        <h3>Upload Profile Image</h3>
                        <div className="upload-area">
                            <label htmlFor="modal-image-input" className="upload-label">
                                <FaCamera /> Choose Image
                            </label>
                            <input
                                type="file"
                                id="modal-image-input"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="modal-buttons">
                            <button onClick={() => setShowImageModal(false)} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPhotoModal && (
                <div className="photo-upload-modal">
                    <div className="photo-modal-content">
                        <div className="photo-modal-header">
                            <h3 className="photo-modal-title">Upload Photo</h3>
                            <button onClick={() => setShowPhotoModal(false)} className="close-modal">×</button>
                        </div>
                        <div className="photo-preview-container">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="photo-preview" />
                            ) : (
                                <div className="upload-placeholder">
                                    <FaCamera size={40} />
                                    <p>Choose a photo to upload</p>
                                </div>
                            )}
                        </div>
                        <div className="photo-upload-actions">
                            <button onClick={() => setShowPhotoModal(false)} className="cancel-button">
                                Cancel
                            </button>
                            <button onClick={handlePhotoUpload} className="upload-button">
                                Upload Photo
                            </button>
                        </div>
                          
                    </div>
                    
                </div>
            )}
            
            
        </div>
        <footer className="footer">
        <div className="particles-bg" id="particles-js"></div>
        <div className="containera">
            <div className="footer-grid">
                <div className="footer-section">
                    <h3>About Samipya</h3>
                    <h4>Find local stores selling what you need in seconds.</h4>
                    <div className="social-links">
                        <a href="https://facebook.com/samipya" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com/samipya" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://instagram.com/samipya" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://linkedin.com/company/samipya" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/seller/about">About Us</Link></li>
                        <li><Link to="/seller/contact">Contact</Link></li>
                        <li><Link to="/seller/privacy">Privacy Policy</Link></li>
                        <li><Link to="/seller/terms">Terms of Service</Link></li>
                        <li><Link to="/seller/faq">FAQ</Link></li>
                        <li><Link to="/Admin">Developer</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <ul className="contact-info1">
                        <li><FaMapMarkerAlt /> Bharatpur, Chitwan, Nepal</li>
                        <li><FaPhone /> +977 9821894320</li>
                        <li><FaEnvelope /> info.samipyaa@gmail.com</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 Samipya. All rights reserved.</p>
        </div>
    </footer>
    </>
    );
};

export default Profile; 