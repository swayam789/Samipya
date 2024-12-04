import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SigninB = () => {
    const [activeType, setActiveType] = useState('user');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleTypeChange = (type) => {
        setActiveType(type);
        // Reset form data when switching types
        setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setError('');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const endpoint = activeType === 'merchant' 
                ? `${API_URL}/seller/auth/register`
                : `${API_URL}/user/auth/register`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Handle successful registration
            if (activeType === 'merchant') {
                navigate('/seller/login');
            } else {
                navigate('/user/login');
            }
        } catch (err) {
            setError(err.message || 'Failed to register. Please try again.');
        }
    };

    return (
        <section className="auth-section1">
            <div className="container1">
                <div className="auth-type-selection">
                    <h2>Choose Account Type</h2>
                    <div className="auth-buttons">
                        <button 
                            className={`auth-type-btn ${activeType === 'user' ? 'active' : ''}`}
                            onClick={() => handleTypeChange('user')}
                            data-type="user"
                        >
                            <i className="fas fa-user"></i>
                            <span>User Account</span>
                        </button>
                        <button 
                            className={`auth-type-btn ${activeType === 'merchant' ? 'active' : ''}`}
                            onClick={() => handleTypeChange('merchant')}
                            data-type="merchant"
                        >
                            <i className="fas fa-store"></i>
                            <span>Seller Account</span>
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-formA">
                    <h2>Sign Up</h2>
                    <input type="hidden" name="accountType" value={activeType}/>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-btn">Sign Up</button>
                    </div>
                    <p className="form-switch">Already have an account? <Link to="/user/login">Login</Link></p>
                </form>
            </div>
        </section>
    );
};

export default SigninB;