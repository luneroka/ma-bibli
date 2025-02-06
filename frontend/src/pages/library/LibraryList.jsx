import React, { useEffect, useState } from 'react';
import BookCover from '../books/BookCover';

function LibraryList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
      </div>
      <div className='flex gap-[145px] mt-[32px]'>
        {books.length > 0 &&
          books.map((book) => {
            <BookCover key={book.id} book={book} />;
          })}
      </div>
    </>
  );
}

export default LibraryList;
