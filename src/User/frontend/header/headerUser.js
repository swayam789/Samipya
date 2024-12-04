
import { Link } from 'react-router-dom'
// import { useAuth } from '../../contexts/AuthContext'
const HeaderUser = () => {
    // const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/user/home" className="logo">
                    <img src="/images/logoSamipya.png" alt="Samipya Logo" className="logo-image" />
                    <h1>Samipya</h1>
                </Link>
                
                <nav className="nav-links">
                    <Link to="/seller/home">Seller</Link>
                    <Link to="/user/categories">Categories</Link>
                    <Link to="/user/about_us">About us</Link>
                    <Link to="/user/career">Career</Link>
                    <Link to="/user/contact">Contact</Link>
                </nav>

                        <Link to="/user/login" className="login-signup-btn">
                            Login/Signup
                        </Link>
                </div>
        </header>
    );
};

export default HeaderUser;