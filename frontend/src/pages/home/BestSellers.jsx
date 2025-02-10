import React from 'react';
import BookCard from '../../components/Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const BestSellers = ({
  bestSellers,
  libraryBooks = [],
  readingListBooks = [],
}) => {
  return (
    <>
      <div className='items-center gap-8 mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>
          Les plus populaires
        </h3>
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
          {bestSellers.length > 0 &&
            bestSellers.map((book) => (
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

export default BestSellers;
