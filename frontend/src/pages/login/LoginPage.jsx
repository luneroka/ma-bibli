import React from 'react';
import NavbarEmpty from '../../components/NavbarEmpty';
import Login from '../../components/Login';
import Footer from '../../components/Footer';

function LoginPage() {
  return (
    <>
      <NavbarEmpty />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Login />
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
