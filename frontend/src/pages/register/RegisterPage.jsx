import React from 'react';
import NavbarAuth from '../../components//Navbar/NavbarAuth';
import Register from './Register';
import Footer from '../../components/Footer';
import { AuthProvider } from '../../context/AuthContext';

function RegisterPage() {
  return (
    <>
      <AuthProvider>
        <NavbarAuth />
        <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
          <Register />
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default RegisterPage;
