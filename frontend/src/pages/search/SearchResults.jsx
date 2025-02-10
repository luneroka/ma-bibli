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
        <div className='flex flex-col flex-wrap gap-4 mt-[32px]'>
          {searchResults.items && searchResults.items.length > 0 ? (
            searchResults.items.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                libraryBooks={libraryBooks}
                readingListBooks={readingListBooks}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
