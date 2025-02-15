import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import LibraryList from './LibraryList';
import NavbarLibrary from '../../components//Navbar/NavbarLibrary';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

function LibraryPage() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const token = await currentUser.getIdToken();
      dispatch(getLibraryBooksAsync({ token }));
    })();
  }, [dispatch, currentUser]);

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
