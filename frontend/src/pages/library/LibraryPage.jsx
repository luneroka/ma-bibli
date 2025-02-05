import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LibraryList from './LibraryList';

function LibraryPage() {
  return (
    <>
      <Navbar />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <LibraryList />
      </main>
      <Footer />
    </>
  );
}

export default LibraryPage;
