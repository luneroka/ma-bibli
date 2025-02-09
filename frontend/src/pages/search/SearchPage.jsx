import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';
import Footer from '../../components/Footer';
import NavbarSearch from '../../components/NavbarSearch';
import { createSearchBooksAsync } from '../../utils/asyncActions';

function SearchPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.searchResults);
  const searchTerm = location.state?.searchTerm || '';

  useEffect(() => {
    if (searchTerm) {
      dispatch(createSearchBooksAsync('search', '/api/search')(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <>
      <NavbarSearch />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <SearchResults searchResults={searchResults} />
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
