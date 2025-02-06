import React, { useEffect, useState } from 'react';
import BookCover from '../books/BookCover';

function LibraryList({ libraryBooks = [] }) {
  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
      </div>
      <div className='flex gap-[145px] mt-[32px]'>
        {libraryBooks.length > 0 &&
          libraryBooks.map((book) => {
            return <BookCover key={book.id} book={book} />;
          })}
      </div>
    </>
  );
}

export default LibraryList;
