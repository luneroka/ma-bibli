import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SearchResults from './SearchResults';
import Footer from '../../components/Footer';
import NavbarSearch from '../../components/Navbar/NavbarSearch';
import {
  createSearchBooksAsync,
  createSearchAuthorAsync,
} from '../../redux/features/search/searchAsyncActions';
import { clearSearchResults } from '../../redux/features/search/searchSlice';

function SearchPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.searchResults);
  const searchTerm = location.state?.searchTerm || '';
  const searchType = location.state?.searchType || '';

  useEffect(() => {
    if (searchTerm) {
      if (searchType === 'author') {
        dispatch(
          createSearchAuthorAsync(
            'searchAuthor',
            '/api/search/author'
          )(searchTerm)
        );
      } else {
        dispatch(
          createSearchBooksAsync('searchBooks', '/api/search/books')(searchTerm)
        );
      }
    }

    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch, searchTerm, searchType]);

  return (
    <>
      <NavbarSearch />
      <main className='flex-1 min-h-0 max-w-full mx-[32px] sm:mx-[64px] md:mx-[128px] font-lato'>
        <SearchResults searchResults={searchResults} />
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
