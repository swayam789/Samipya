import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import HeaderUser from '../header/headerUser';

const ProtectedLayoutUser = () => {
  // You can add authentication check here if needed
  // const isAuthenticated = ...

  return (
    <div className="layout">
      <HeaderUser /> {/* This will appear on all /user/ routes */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayoutUser; 