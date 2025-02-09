import React, { useEffect } from 'react';
import NavbarLibrary from '../../components/NavbarLibrary';
import Footer from '../../components/Footer';
import ReadingList from './ReadingList';
import { getReadingListBooksAsync } from '../../utils/readingListAsyncActions';
import { useDispatch, useSelector } from 'react-redux';

function ReadingListPage() {
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  useEffect(() => {
    dispatch(getReadingListBooksAsync());
  }, [dispatch]);

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <ReadingList libraryBooks={libraryBooks} readingListBooks={readingListBooks} />
      </main>
      <Footer />
    </>
  );
}

export default ReadingListPage;
