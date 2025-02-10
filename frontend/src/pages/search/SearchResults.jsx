import React from 'react';
import BookCard from '../../components/Book/BookCard';
import { useSelector } from 'react-redux';

function SearchResults({ searchResults = { items: [] } }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );
  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mt-[32px]'>
          {searchResults.items.map((book) => (
            <BookCard
              key={book.id}
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
