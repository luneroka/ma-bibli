import React from 'react';
import NavbarLibrary from '../../components/NavbarLibrary';
import Footer from '../../components/Footer';
import ReadingList from './ReadingList';

function ReadingListPage() {
  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <ReadingList />
      </main>
      <Footer />
    </>
  );
}

export default ReadingListPage;
