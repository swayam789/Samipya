import { createContext, useContext, useState, useEffect } from 'react';
import { checkSellerAuthStatus } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = () => {
            const isAuth = checkSellerAuthStatus();
            if (isAuth) {
                const sellerData = JSON.parse(localStorage.getItem('seller'));
                setUser(sellerData);
                setIsAuthenticated(true);
            } else {
                // If not authenticated and not on login/register page, redirect to login
                const path = window.location.pathname;
                if (!path.includes('/login') && !path.includes('/seller/signup') && !path.includes('/user') && !path.includes('/admin')) {
                    navigate('/seller/login');
                }
            }
            setLoading(false);
        };
        
        initAuth();
    }, [navigate]);

    const login = (userData, token) => {
        localStorage.setItem('seller_token', token);
        localStorage.setItem('seller', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('seller_token');
        localStorage.removeItem('seller');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/seller/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            setUser,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 