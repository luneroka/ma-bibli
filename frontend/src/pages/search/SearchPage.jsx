import React from 'react';
import SearchResults from './SearchResults';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function SearchPage() {
  return (
    <>
      <Navbar />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <SearchResults />
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
