import React from 'react';
import BookInReadingList from '../../components/Book/BookInReadingList';

function ReadingList({ libraryBooks = [], readingListBooks = [] }) {
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
                key={book.isbn}
                book={book}
                libraryBooks={libraryBooks}
              />
            );
          })}
      </div>
    </>
  );
}

export default ReadingList;
