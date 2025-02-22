import React from 'react';
import BookCard from '../../components/Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const NewReleases = ({ newest, libraryBooks = [], wishlistBooks = [] }) => {
  return (
    <>
      <div className='flex items-center gap-8 mb-[32px]'>
        <h2 className='text-h2 text-black font-merriweather'>Nouveautés</h2>
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
          1450: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        <div className='flex gap-[145px]'>
          {newest.map((book) => (
            <SwiperSlide key={book.isbn}>
              <BookCard
                variant='card'
                book={book}
                libraryBooks={libraryBooks}
                wishlistBooks={wishlistBooks}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default NewReleases;
