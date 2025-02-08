import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/register/RegisterPage.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import LibraryPage from './pages/library/LibraryPage.jsx';
import ReadingListPage from './pages/reading-list/ReadingListPage.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/liste-de-lecture' element={<ReadingListPage />} />
        <Route path='/bibli' element={<LibraryPage />} />
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
