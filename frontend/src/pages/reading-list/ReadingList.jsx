import React from 'react';
import BookInReadingList from '../books/BookInReadingList';

function ReadingList({ readingListBooks = [] }) {
  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>
          Ma Liste de lecture
        </h3>
      </div>
      <div className='flex flex-wrap gap-4 mt-[32px]'>
        {readingListBooks.length > 0 &&
          readingListBooks.map((book) => {
            return (
              <BookInReadingList
                key={book.id}
                book={book}
              />
            );
          })}
      </div>
    </>
  );
}

export default ReadingList;
