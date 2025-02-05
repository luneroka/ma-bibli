import React from 'react';
import NavbarEmpty from '../../components/NavbarEmpty';
import Register from '../../components/Register';
import Footer from '../../components/Footer';

function RegisterPage() {
  return (
    <>
      <NavbarEmpty />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Register />
      </main>
      <Footer />
    </>
  );
}

export default RegisterPage;
