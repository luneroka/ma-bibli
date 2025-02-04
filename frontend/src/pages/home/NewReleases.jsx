import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';

const NewReleases = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <div className='flex items-center gap-8'>
        <h2 className='text-h2 font-merriweather'>Sorties récentes</h2>
      </div>

      <div className='flex gap-[145px] mt-[32px]'>
        {books.map((book, index) => (
          <BookCard key={index} book={book}/>
        ))}
      </div>
    </>
  );
};

export default NewReleases;
