import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../Header/header';
import Sidebar from '../sidebar/sidebar';

const ProtectedLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
    
  // Pages where sidebar should be hidden
  const noSidebarPages = ['/seller/dashboard', '/seller/about'];
  const shouldShowSidebar = !noSidebarPages.includes(location.pathname);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/seller/login" replace />;
  }

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        {shouldShowSidebar && <Sidebar />}
        <main className={`content ${!shouldShowSidebar ? 'full-width' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout; 