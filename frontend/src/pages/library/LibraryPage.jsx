import React from 'react';
import Footer from '../../components/Footer';
import LibraryList from './LibraryList';
import NavbarLibrary from '../../components/NavbarLibrary';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LibraryPage() {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <LibraryList books={libraryBooks} />
      </main>
      <Footer />
    </>
  );
}

export default LibraryPage;
