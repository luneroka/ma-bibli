import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import LibraryPage from './pages/library/LibraryPage.jsx';
import ReadingListPage from './pages/reading-list/ReadingListPage.jsx';
import SingleBookPage from './pages/single-book/SingleBookPage.jsx';
import SearchPage from './pages/search/SearchPage.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/recherche' element={<SearchPage />} />
        <Route path='/liste-de-lecture' element={<ReadingListPage />} />
        <Route path='/bibli' element={<LibraryPage />} />
        <Route path='/livres' element={<Navigate to='/' />} />
        <Route path='/livres/:isbn' element={<SingleBookPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

{
  /* 
<Route path='/dashboard' element=<h1>Dashboard</h1> />
<Route path='/mon-compte' element=<h1>Mon Compte</h1> />
<Route path='/logout' element=<h1>Se déconnecter</h1> /> */
}
