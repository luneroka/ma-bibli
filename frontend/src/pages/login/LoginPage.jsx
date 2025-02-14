import React from 'react';
import NavbarAuth from '../../components//Navbar/NavbarAuth';
import Login from './Login';
import Footer from '../../components/Footer';
import { AuthProvider } from '../../context/AuthContext';

function LoginPage() {
  return (
    <>
      <AuthProvider>
        <NavbarAuth />
        <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
          <Login />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default LoginPage;
