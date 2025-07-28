import PropTypes from 'prop-types';
import BookCard from '../../components/Book/BookCard';
import { useSelector } from 'react-redux';

function SearchResults({ searchResults = { items: [] }, loading, error }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  // Always use the transformed items array
  const booksArray = Array.isArray(searchResults.items)
    ? searchResults.items
    : [];

  const uniqueBooks = booksArray.filter(
    (book, index, self) => index === self.findIndex((b) => b.isbn === book.isbn)
  );

  // Filter out invalid books
  const validBooks = uniqueBooks.filter(
    (book) => book && (book.isbn || book.title)
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <span className='animate-spin text-3xl text-black-50'>⏳</span>
        <span className='ml-4 text-lg text-black-50'>Recherche...</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className='text-red-500 justify-start text-body font-merriweather pt-8'>
        Erreur lors de la recherche : {error}
      </p>
    );
  }

  if (validBooks.length === 0) {
    return (
      <p className='text-black-100 justify-start text-body font-merriweather pt-8'>
        Pas de résultat...
      </p>
    );
  }

  return (
    <>
      <div className='items-center gap-8 mt-[32px] sm:mt-[64px] mb-[32px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mt-[32px]'>
          {validBooks.map((book) => (
            <BookCard
              key={book.isbn}
              book={book}
              libraryBooks={libraryBooks}
              wishlistBooks={wishlistBooks}
            />
          ))}
        </div>
      </div>
    </>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.shape({
    items: PropTypes.array,
    data: PropTypes.array,
  }),
  loading: PropTypes.bool,
  error: PropTypes.any,
};

export default SearchResults;
