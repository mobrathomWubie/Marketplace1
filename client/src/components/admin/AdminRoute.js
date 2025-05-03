import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with your actual authentication check

  return isAuthenticated ? children : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;