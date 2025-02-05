import React from 'react';
import Footer from '../../components/Footer';
import LibraryList from './LibraryList';
import NavbarLibrary from '../../components/NavbarLibrary';

function LibraryPage() {
  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <LibraryList />
      </main>
      <Footer />
    </>
  );
}

export default LibraryPage;
