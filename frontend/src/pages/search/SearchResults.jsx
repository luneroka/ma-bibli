import React from 'react';
import BookSearch from '../../components/Book/BookSearch';

function SearchResults({ searchResults = { items: [] } }) {
  console.log('SearchResults searchResults:', searchResults);
  return (
    <>
    <div className='items-center gap-8 mt-[64px] mb-[32px]'>
      <div className='flex flex-col flex-wrap gap-4 mt-[32px]'>
        {searchResults.items && searchResults.items.length > 0 ? (
          searchResults.items.map((book) => (
            <BookSearch key={book.id} book={book} />
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
