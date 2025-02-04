import React, { useEffect, useState } from 'react';

const categories = [
  'Filtrer par genre',
  'Business',
  'Fiction',
  'Horreur',
  'Aventure',
];

const TopSellers = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('books.json')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  console.log(books);

  return (
    <>
      <div className='flex items-center gap-8'>
        <h2 className='text-h2 font-merriweather'>Top ventes</h2>
        {/* Category filter */}
        <div>
          <select
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
    </>
  );
};

export default TopSellers;
