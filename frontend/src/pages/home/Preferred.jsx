import BookCard from '../../components/Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import PropTypes from 'prop-types';

const Preferred = ({ preferred, libraryBooks = [], wishlistBooks = [] }) => {
  // Use the correct property from the API payload
  const books = Array.isArray(preferred?.items) ? preferred.items : [];

  return (
    <>
      <div className='flex items-center gap-8 mb-[16px] md:mb-[32px]'>
        <h2 className='text-h4 xs:text-h3 min-[1450px]:text-h2 text-black-100 font-merriweather'>
          Ces livres pourraient vous plaire
        </h2>
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
          750: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1050: {
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
          {books.map((book, idx) => (
            <SwiperSlide key={book.isbn || book.id || idx}>
              <BookCard
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

Preferred.propTypes = {
  preferred: PropTypes.shape({
    items: PropTypes.array,
    data: PropTypes.array, // Add validation for 'data'
  }),
  libraryBooks: PropTypes.array,
  wishlistBooks: PropTypes.array,
};

export default Preferred;
