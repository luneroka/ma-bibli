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
import LibraryPage from './pages/library/LibraryPage.jsx';
import ReadingListPage from './pages/reading-list/ReadingListPage.jsx';
import SingleBookPage from './pages/single-book/SingleBookPage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import UserPage from './pages/user/UserPage.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import AuthLayout from './pages/auth/AuthLayout';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* Routes sharing the same NavbarAuth & Footer */}
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>

          <Route path='/recherche' element={<SearchPage />} />
          
          <Route
            path='/liste-de-lecture'
            element={
              <PrivateRoute>
                <ReadingListPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/bibli'
            element={
              <PrivateRoute>
                <LibraryPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <h1>Dashboard</h1>
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
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
