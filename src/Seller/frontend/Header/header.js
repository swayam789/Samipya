import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/seller/home" className="logo">
                    <img src="/images/logoSamipya.png" alt="Samipya Logo" className="logo-image" />
                    <h1>Samipya</h1>
                </Link>
                
                <nav className="nav-links">
                    <Link to="/user/home">User</Link>
                    <Link to="/seller/dashboard">Dashboard</Link>
                    <Link to="/seller/about">About us</Link>
                    <Link to="/seller/career">Career</Link>
                    <Link to="/seller/contact">Contact</Link>
                </nav>

                <div className="auth-section">
                    {user ? (
                        <div className="user-profile">
                            <Link to="/seller/profile" className="profile-link">
                                <img 
                                    src={user.profileImage || "/images/default-profile.jpg"} 
                                    alt="Profile" 
                                    className="profile-icon"
                                />
                                <span className="username">{user.username}</span>
                            </Link>
                            <button onClick={logout} className="logout-button">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/seller/login" className="login-signup-btn">
                            Login/Signup
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

