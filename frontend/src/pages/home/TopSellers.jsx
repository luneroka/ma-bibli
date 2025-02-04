import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';

const categories = [
  'Filtrer par genre',
  'Classique',
  'Fiction',
  'Drame',
  'Poésie',
  'Théâtre',
];

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Filtrer par genre');

  useEffect(() => {
    fetch('books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks =
    selectedCategory === 'Filtrer par genre'
      ? books
      : books.filter(
          (book) =>
            book.volumeInfo.categories?.[0]?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <>
      <div className='flex items-center gap-8'>
        <h2 className='text-h2 font-merriweather'>Top ventes</h2>
        {/* Category filter */}
        <div>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name='category'
            id='category'
            className='bg-secondary-btn px-2 py-1 rounded-lg text-white-bg'
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex gap-[145px] mt-[32px]'>
        {filteredBooks.map((book, index) => (
          <BookCard key={index} book={book}/>
        ))}
      </div>
    </>
  );
};

export default TopSellers;
