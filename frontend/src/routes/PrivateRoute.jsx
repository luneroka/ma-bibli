import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to='/login' />;
}

export default PrivateRoute;
