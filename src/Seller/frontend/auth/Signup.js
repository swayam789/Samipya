import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        shopName: '',
        location: '',
        latitude: '',
        longitude: '',
        landmarks: '',
        contact: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        
        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase and numbers';
        }

        // Confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Shop name validation
        if (!formData.shopName.trim()) {
            newErrors.shopName = 'Shop name is required';
        }

        // Location validation
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        // Contact validation
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.contact) {
            newErrors.contact = 'Contact number is required';
        } else if (!phoneRegex.test(formData.contact)) {
            newErrors.contact = 'Invalid contact number format';
        }

        // Coordinates validation
        if (formData.latitude && (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90)) {
            newErrors.latitude = 'Invalid latitude (-90 to 90)';
        }
        if (formData.longitude && (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180)) {
            newErrors.longitude = 'Invalid longitude (-180 to 180)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/seller/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                    shopName: formData.shopName,
                    location: formData.location,
                    latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
                    longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
                    landmarks: formData.landmarks,
                    contact: formData.contact,
                    description: formData.description
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            login(data.user, data.token);
            navigate('/seller/dashboard');
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                submit: err.message || 'Failed to sign up. Please try again.'
            }));
        } finally {
            setLoading(false);
        }
    };

    // Optional: Get current location
    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6)
                    }));
                },
                (error) => {
                    setErrors(prev => ({
                        ...prev,
                        location: 'Failed to get location: ' + error.message
                    }));
                }
            );
        } else {
            setErrors(prev => ({
                ...prev,
                location: 'Geolocation is not supported by your browser'
            }));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card signup-card">
                <h2>Sign Up for Samipya</h2>
                {errors.submit && <div className="error-message">{errors.submit}</div>}
                
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group full-width">
                        <label>Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className={errors.username ? 'error' : ''}
                        />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label>Set Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <div className="location-group">
                        <div className="form-group full-width">
                            <label>Location</label>
                            <div className="location-input-group">
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className={errors.location ? 'error' : ''}
                                />
                                <button type="button" onClick={getCurrentLocation} className="location-btn">
                                    Get Location
                                </button>
                            </div>
                            {errors.location && <span className="error-text">{errors.location}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Latitude</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.latitude}
                                onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value)})}
                                className={errors.latitude ? 'error' : ''}
                            />
                            {errors.latitude && <span className="error-text">{errors.latitude}</span>}
                        </div>
                        <div className="form-group">
                            <label>Longitude</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.longitude}
                                onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value)})}
                                className={errors.longitude ? 'error' : ''}
                            />
                            {errors.longitude && <span className="error-text">{errors.longitude}</span>}
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Landmarks (optional)</label>
                        <input
                            type="text"
                            value={formData.landmarks}
                            onChange={(e) => setFormData({...formData, landmarks: e.target.value})}
                            className={errors.landmarks ? 'error' : ''}
                        />
                        {errors.landmarks && <span className="error-text">{errors.landmarks}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label>Shop Name</label>
                        <input
                            type="text"
                            value={formData.shopName}
                            onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                            className={errors.shopName ? 'error' : ''}
                        />
                        {errors.shopName && <span className="error-text">{errors.shopName}</span>}
                    </div>

                    <div className="form-group full-width">
                        <label>Contact</label>
                        <input
                            type="text"
                            value={formData.contact}
                            onChange={(e) => setFormData({...formData, contact: e.target.value})}
                            className={errors.contact ? 'error' : ''}
                        />
                        {errors.contact && <span className="error-text">{errors.contact}</span>}
                    </div>

                    <div className="form-group description">
                        <label>Description (optional)</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button1" 
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account? <Link to="/seller/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup; 