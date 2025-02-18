import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookAsync } from '../../redux/features/single-book/singleBookAsyncActions';
import NavbarLibrary from '../../components//Navbar/NavbarLibrary';
import Footer from '../../components/Footer';
import BookCard from '../../components/Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

function SingleBookPage() {
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const { book, status, error } = useSelector((state) => state.singleBook);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  useEffect(() => {
    if (isbn) {
      dispatch(getSingleBookAsync(isbn));
    } else {
      console.error('ISBN parameter is undefined');
    }
  }, [dispatch, isbn]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] mt-[64px] font-lato'>
        {book ? (
          <>
            <BookCard
              variant='single'
              book={book}
              libraryBooks={libraryBooks}
              readingListBooks={readingListBooks}
            />

            <h2 className='mt-[64px] mb-[32px]'>Du même auteur</h2>
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
                {libraryBooks.map((book) => (
                  <SwiperSlide key={book.isbn}>
                    <BookCard
                      variant='author'
                      book={book}
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </>
        ) : (
          <div>No book data available</div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SingleBookPage;
