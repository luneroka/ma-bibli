import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const location = useLocation();
  const { currentUser } = useAuth();

  // Pass the attempted URL in state so that Login can redirect back after successful login
  return currentUser ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} />
  );
}

export default PrivateRoute;
