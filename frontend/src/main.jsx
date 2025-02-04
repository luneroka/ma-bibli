import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/dashboard' element=<h1>Dashboard</h1> />
          <Route path='/mon-compte' element=<h1>Mon Compte</h1> />
          <Route path='/logout' element=<h1>Se déconnecter</h1> />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
