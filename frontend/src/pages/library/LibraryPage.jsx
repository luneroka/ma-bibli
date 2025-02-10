import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import LibraryList from './LibraryList';
import NavbarLibrary from '../../components/NavbarLibrary';
import { getLibraryBooksAsync } from '../../utils/libraryAsyncActions';
import { useDispatch, useSelector } from 'react-redux';

function LibraryPage() {
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);

  useEffect(() => {
    dispatch(getLibraryBooksAsync());
  }, [dispatch]);

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <LibraryList libraryBooks={libraryBooks} />
      </main>
      <Footer />
    </>
  );
}

export default LibraryPage;
