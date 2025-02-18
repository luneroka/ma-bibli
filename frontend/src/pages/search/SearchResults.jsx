import React from 'react';
import BookCard from '../../components/Book/BookCard';
import { useSelector } from 'react-redux';

function SearchResults({ searchResults = { items: [] } }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  const uniqueBooks = searchResults.items.filter(
    (book, index, self) => index === self.findIndex((b) => b.isbn === book.isbn)
  );

  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 mt-[32px]'>
          {uniqueBooks
            .filter((book) => book && (book.isbn || book.title))
            .map((book) => (
              <BookCard
                variant='card'
                key={book.isbn}
                book={book}
                libraryBooks={libraryBooks}
                readingListBooks={readingListBooks}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
