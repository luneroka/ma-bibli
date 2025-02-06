import React from 'react';
import NavbarAuth from '../../components/NavbarAuth';
import Register from './Register';
import Footer from '../../components/Footer';

function RegisterPage() {
  return (
    <>
      <NavbarAuth />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Register />
      </main>
      <Footer />
    </>
  );
}

export default RegisterPage;
