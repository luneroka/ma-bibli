import React from 'react';
import NavbarLibrary from '../../components/NavbarLibrary';
import LibraryList from '../library/LibraryList';
import Footer from '../../components/Footer';

function ReadingListPage() {
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

export default ReadingListPage;
