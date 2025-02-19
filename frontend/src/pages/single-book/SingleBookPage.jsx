import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookAsync } from '../../redux/features/single-book/singleBookAsyncActions';
import NavbarLibrary from '../../components/Navbar/NavbarLibrary';
import Footer from '../../components/Footer';
import BookCard from '../../components/Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { createSearchAuthorAsync } from '../../redux/features/search/searchAsyncActions';

function SingleBookPage() {
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.singleBook);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  // Local state for author books and loading status
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // GET SINGLE BOOK
  useEffect(() => {
    if (isbn) {
      setIsLoading(true);
      dispatch(getSingleBookAsync(isbn))
        .unwrap()
        .finally(() => setIsLoading(false));
    } else {
      console.error('ISBN parameter is undefined');
      setIsLoading(false);
    }
  }, [dispatch, isbn]);

  // GET BOOKS FROM SAME AUTHOR using local state
  useEffect(() => {
    // Clear previous search results immediately
    setAuthorBooks([]);
    let cancelled = false; // local flag for cancellation

    if (book?.authors?.length > 0) {
      const searchTerm = book.authors[0];
      dispatch(
        createSearchAuthorAsync(
          'searchAuthor',
          '/api/search/author'
        )(searchTerm)
      )
        .unwrap()
        .then((data) => {
          if (!cancelled) {
            setAuthorBooks(data?.items || []);
          }
        })
        .catch((error) => {
          if (!cancelled) {
            console.error('Search author error:', error);
            setAuthorBooks([]);
          }
        });
    }

    return () => {
      cancelled = true; // ignore resolution if effect is cleaned up
    };
  }, [dispatch, isbn, book]);

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] mt-[64px] font-lato'>
        {isLoading ? (
          <div className='text-center py-16 text-lg'>Loading...</div>
        ) : book ? (
          <>
            <BookCard
              variant='single'
              book={book}
              libraryBooks={libraryBooks}
              readingListBooks={readingListBooks}
            />

            <h2 className='mt-[64px] mb-[32px] font-merriweather text-h6'>
              Du même auteur
            </h2>
            <Swiper
              key={isbn}
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
              {authorBooks.map((authorBook, index) => (
                <SwiperSlide key={`${authorBook.isbn}-${index}`}>
                  <BookCard variant='author' book={authorBook} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <div className='text-center py-16 text-lg'>
            No book data available
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SingleBookPage;
