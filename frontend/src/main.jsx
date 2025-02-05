import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/liste-de-lecture' element=<h1>Liste de lecture</h1> />
          <Route path='/bibliothèque' element=<h1>Bibliothèque</h1> />
          <Route path='/dashboard' element=<h1>Dashboard</h1> />
          <Route path='/mon-compte' element=<h1>Mon Compte</h1> />
          <Route path='/logout' element=<h1>Se déconnecter</h1> />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
