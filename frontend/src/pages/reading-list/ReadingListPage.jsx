import React from 'react';
import NavbarLibrary from '../../components/NavbarLibrary';
import Footer from '../../components/Footer';
import ReadingList from './ReadingList';
import { useSelector } from 'react-redux';

function ReadingListPage() {
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <ReadingList readingListBooks={readingListBooks} />
      </main>
      <Footer />
    </>
  );
}

export default ReadingListPage;
