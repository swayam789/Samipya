import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/seller/auth/login`, formData);
            
            if (response.data.token) {
                login(response.data.user, response.data.token);
                navigate('/seller/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login to Samipya</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username / Email</label>
                        <input
                            type="text"
                            value={formData.emailOrUsername}
                            onChange={(e) => setFormData({...formData, emailOrUsername: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button1">Login</button>
                </form>
                <p className="auth-link">
                    Don't have an account? <Link to="/seller/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 