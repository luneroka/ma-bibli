import React from 'react';
import BookCard from '../../components/Book/BookCard';
import { useSelector } from 'react-redux';

function SearchResults({ searchResults = { items: [] } }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  const uniqueBooks = searchResults.items.filter(
    (book, index, self) => index === self.findIndex((b) => b.isbn === book.isbn)
  );

  // Filter out invalid books
  const validBooks = uniqueBooks.filter(
    (book) => book && (book.isbn || book.title)
  );

  return (
    <>
      <div className='items-center gap-8 mt-[32px] sm:mt-[64px] mb-[32px]'>
        {validBooks.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mt-[32px]'>
            {validBooks.map((book) => (
              <BookCard
                variant='card'
                key={book.isbn}
                book={book}
                libraryBooks={libraryBooks}
                wishlistBooks={wishlistBooks}
              />
            ))}
          </div>
        ) : (
          <p className='text-black-100 justify-start text-body font-merriweather'>
            Pas de résultats...
          </p>
        )}
      </div>
    </>
  );
}

export default SearchResults;
