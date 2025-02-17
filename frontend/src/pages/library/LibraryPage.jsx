import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import LibraryList from './LibraryList';
import NavbarLibrary from '../../components/Navbar/NavbarLibrary';

function LibraryPage() {
  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <LibraryList />
      </main>
      <Footer />
    </>
  );
}

export default LibraryPage;
