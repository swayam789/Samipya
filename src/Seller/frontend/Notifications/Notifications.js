import React, { useEffect, useState } from 'react';
import './Notifications.css';
import { FaBell, FaCheck, FaShoppingBag, FaTag, FaExclamationCircle } from 'react-icons/fa';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        fetch(`${API_URL}/seller/notifications`)
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order':
                return <FaShoppingBag className="notification-icon order" />;
            case 'promotion':
                return <FaTag className="notification-icon promotion" />;
            case 'stock':
                return <FaExclamationCircle className="notification-icon stock" />;
            default:
                return <FaBell className="notification-icon system" />;
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="det-content">
            <div className="notifications-header">
                <h1>Notifications</h1>
                <div className="notifications-counter">
                    {notifications.filter(n => !n.isRead).length} unread
                </div>
            </div>
            <div className="notifications-container">
                {notifications.map((notification) => (
                    <div key={notification._id} 
                         className={`notification-card ${!notification.isRead ? 'unread' : ''}`}>
                        <div className="notification-content">
                            {getNotificationIcon(notification.type)}
                            <div className="notification-details">
                                <div className="notification-message">
                                    {notification.message}
                                </div>
                                <div className="notification-meta">
                                    <span className="notification-type">
                                        {notification.type}
                                    </span>
                                    <span className="notification-date">
                                        {formatDate(notification.createdAt)}
                                    </span>
                                </div>
                            </div>
                            {!notification.isRead && (
                                <div className="notification-status">
                                    <FaCheck className="mark-read" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications; 