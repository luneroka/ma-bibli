import React, { useEffect, useState, useRef } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';

const categories = [
  'Filtrer par genre',
  'Classique',
  'Fiction',
  'Drame',
  'Poésie',
  'Théâtre',
];

const MostPopulars = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Filtrer par genre');
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

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
      <div className='items-center gap-8 mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>
          Les plus populaires
        </h3>
        {/* Category filter */}
        <div className='mt-[16px]'>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name='category'
            id='category'
            className='bg-secondary-btn px-2 py-1 rounded-lg text-white-bg text-small focus:outline-none cursor-pointer'
          >
            {categories.map((category, index) => (
              <option key={index} value={category} className='text-center'>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          880: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1250: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1570: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        <div className='flex gap-[145px] mt-[32px]'>
          {filteredBooks.length > 0 &&
            filteredBooks.map((book) => (
              <SwiperSlide key={book.id}>
                <BookCard
                  book={book}
                  libraryBooks={libraryBooks}
                  readingListBooks={readingListBooks}
                />
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </>
  );
};

export default MostPopulars;
