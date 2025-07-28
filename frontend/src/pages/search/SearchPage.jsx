import { useEffect } from 'react';
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
import { getApiPath } from '../../utils/apiConfig';
import { FaSpinner } from 'react-icons/fa';

function SearchPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.searchResults);
  const loading = useSelector((state) => state.search.loading);
  const error = useSelector((state) => state.search.error);
  const searchTerm = location.state?.searchTerm || '';
  const searchType = location.state?.searchType || '';

  useEffect(() => {
    if (searchTerm) {
      if (searchType === 'author') {
        dispatch(
          createSearchAuthorAsync(
            'searchAuthor',
            getApiPath('/api/search/author')
          )(searchTerm)
        );
      } else {
        dispatch(
          createSearchBooksAsync(
            'searchBooks',
            getApiPath('/api/search/books')
          )(searchTerm)
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
      <main className='flex-1 min-h-0 max-w-full mx-[32px] sm:mx-[64px] lg:mx-[128px] font-lato'>
        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <FaSpinner className='animate-spin text-3xl text-black-50' />
            <span className='ml-4 text-lg text-black-50'>Recherche...</span>
          </div>
        ) : (
          <SearchResults
            searchResults={searchResults}
            loading={loading}
            error={error}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default SearchPage;
