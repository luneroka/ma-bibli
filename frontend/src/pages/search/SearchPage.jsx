import React from 'react';
import SearchResults from './SearchResults';
import Footer from '../../components/Footer';
import NavbarSearch from '../../components/NavbarSearch';

function SearchPage() {
  return (
    <>
      <NavbarSearch />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <SearchResults />
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
