import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarLibrary from '../../components//Navbar/NavbarLibrary';
import Footer from '../../components/Footer';

function ShelfLayout() {
  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default ShelfLayout;
