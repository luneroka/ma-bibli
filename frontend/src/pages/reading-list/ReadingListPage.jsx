import React, { useEffect } from 'react';
import NavbarLibrary from '../../components//Navbar/NavbarLibrary';
import Footer from '../../components/Footer';
import ReadingList from './ReadingList';
import { getReadingListBooksAsync } from '../../redux/features/reading-list/readingListAsyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

function ReadingListPage() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const token = await currentUser.getIdToken();
      dispatch(getReadingListBooksAsync({ token }));
    })();
  }, [dispatch, currentUser]);

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <ReadingList
          libraryBooks={libraryBooks}
          readingListBooks={readingListBooks}
        />
      </main>
      <Footer />
    </>
  );
}

export default ReadingListPage;
