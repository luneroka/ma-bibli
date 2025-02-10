import React from 'react';
import BookInLibrary from '../../components/Book/BookInLibrary';

function LibraryList({ libraryBooks = [] }) {
  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
      </div>

      <div className='flex flex-wrap gap-4 mt-[32px]'>
        {libraryBooks.length > 0 &&
          libraryBooks.map((book) => {
            return <BookInLibrary key={book.id} book={book} />;
          })}
      </div>
    </>
  );
}

export default LibraryList;
