import './auth.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AuthB = () => {
    const [activeType, setActiveType] = useState('user');

    const handleTypeChange = (type) => {
        setActiveType(type);
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

                <div className="auth-forms">
                    <form id="loginForm" className="auth-form active">
                        <h2>Login</h2>
                        <div className="form-group">
                            <input type="email" placeholder="Email" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" required/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit-btn">Login</button>
                        </div>
                        <p className="form-switch">Don't have an account? <Link to="/user/signup">Sign Up</Link></p>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </form>
                </div>
            </div>
        </section>      
    );
};

export default AuthB;