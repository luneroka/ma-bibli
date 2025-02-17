import React from 'react';
import BookInLibrary from '../../components/Book/BookInLibrary';

function LibraryList({ libraryBooks = [] }) {
  return (
    <>
      <div className='flex justify-between items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
        <select className='py-1 px-4 bg-secondary-btn text-white-bg w-[200px]'>
          {/* Map options */}
        </select>
      </div>

      <div className='flex flex-wrap gap-7 mt-[32px]'>
        {libraryBooks.length > 0 &&
          libraryBooks.map((book) => {
            return <BookInLibrary key={book.isbn} book={book} />;
          })}
      </div>
    </>
  );
}

export default LibraryList;
