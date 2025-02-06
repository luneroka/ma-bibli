import React from 'react';
import NavbarAuth from '../../components/NavbarAuth';
import Login from './Login';
import Footer from '../../components/Footer';

function LoginPage() {
  return (
    <>
      <NavbarAuth />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Login />
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
