import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { AuthProvider } from './context/AuthContext';

import App from './App.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import SingleBookPage from './pages/single-book/SingleBookPage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import UserPage from './pages/user/UserPage.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import AuthLayout from './pages/auth/AuthLayout';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import ShelfLayout from './pages/shelves/ShelfLayout.jsx';
import Wishlist from './pages/shelves/Wishlist.jsx';
import LibraryList from './pages/shelves/LibraryList.jsx';
import AuthConfirmation from './pages/auth/AuthConfirmation.jsx';
import { ReadingObjectiveProvider } from './context/ReadingObjectiveContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <ReadingObjectiveProvider>
          <Routes>
            {/* HOME ROUTES */}
            <Route path='/' element={<App />}>
              <Route index element={<HomePage />} />
            </Route>

            {/* AUTH LAYOUT ROUTES */}
            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/confirmation' element={<AuthConfirmation />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
            </Route>

            {/* SHELF LAYOUT ROUTE */}
            <Route element={<ShelfLayout />}>
              <Route
                path='/wishlist'
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
              />
              <Route
                path='/bibli'
                element={
                  <PrivateRoute>
                    <LibraryList />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* SEARCH ROUTES */}
            <Route path='/recherche' element={<SearchPage />} />

            {/* ACCOUNT ROUTES */}
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/mon-compte'
              element={
                <PrivateRoute>
                  <UserPage />
                </PrivateRoute>
              }
            />
            <Route path='/livres' element={<Navigate to='/' />} />
            <Route path='/livres/:isbn' element={<SingleBookPage />} />
          </Routes>
        </ReadingObjectiveProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
