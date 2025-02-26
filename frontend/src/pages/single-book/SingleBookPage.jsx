import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookAsync } from '../../redux/features/single-book/singleBookAsyncActions';
import { createSearchAuthorAsync } from '../../redux/features/search/searchAsyncActions';
import NavbarLibrary from '../../components/Navbar/NavbarLibrary';
import Footer from '../../components/Footer';
import BookCard from '../../components/Book/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { FaSpinner } from 'react-icons/fa';

function SingleBookPage() {
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const { book, error: bookError } = useSelector((state) => state.singleBook);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  const isInLibrary = book
    ? libraryBooks.some((libraryBook) => libraryBook.isbn === book.isbn)
    : false;

  // Local state
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET SINGLE BOOK
  useEffect(() => {
    if (!isbn) {
      console.error('ISBN parameter is undefined');
      setIsLoading(false);
      setError('ISBN parameter is missing');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Check if book already exists in library (for manually created books)
    const libraryBook = libraryBooks.find((book) => book.isbn === isbn);

    if (libraryBook) {
      // If book is already in Redux library state, use it directly
      dispatch({
        type: 'singleBook/getSingleBookAsync/fulfilled',
        payload: libraryBook,
      });
      setIsLoading(false);

      if (libraryBook.authors?.length > 0) {
        searchAuthorBooks(libraryBook.authors[0]);
      }
    } else {
      // Otherwise fetch it through the normal flow
      dispatch(getSingleBookAsync(isbn))
        .unwrap()
        .then((data) => {
          const bookData = data.book || data;
          if (bookData?.authors?.length > 0) {
            searchAuthorBooks(bookData.authors[0]);
          }
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch book details');
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, isbn, libraryBooks]);

  // GET FROM SAME AUTHORS
  const searchAuthorBooks = (authorName) => {
    setAuthorBooks([]); // Clear previous results

    dispatch(
      createSearchAuthorAsync('searchAuthor', '/api/search/author')(authorName)
    )
      .unwrap()
      .then((data) => {
        if (!data?.items) {
          setAuthorBooks([]);
          return;
        }

        // First filter out the current book
        let filteredBooks = data.items.filter((item) => item.isbn !== isbn);

        // Then filter out duplicates by creating a unique Set of ISBNs
        const uniqueIsbns = new Set();
        filteredBooks = filteredBooks.filter((book) => {
          const isDuplicate = uniqueIsbns.has(book.isbn);
          uniqueIsbns.add(book.isbn);
          return !isDuplicate;
        });

        setAuthorBooks(filteredBooks);
      })
      .catch((error) => {
        console.error('Search author error:', error);
        setAuthorBooks([]);
      });
  };

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] mt-[64px] font-lato'>
        {isLoading ? (
          <div className='flex items-center justify-center py-16'>
            <FaSpinner className='animate-spin text-3xl text-black-50' />
          </div>
        ) : error || bookError ? (
          <div className='text-center py-16 text-lg text-red-500'>
            {error || bookError || 'Error loading book details'}
          </div>
        ) : book ? (
          <>
            <BookCard
              variant={isInLibrary ? 'perso' : 'single'}
              book={book}
              libraryBooks={libraryBooks}
              wishlistBooks={wishlistBooks}
            />

            <h2 className='mt-[64px] mb-[32px] font-merriweather text-h6'>
              Du même auteur
            </h2>

            {authorBooks.length > 0 ? (
              <Swiper
                key='author-books-swiper'
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  880: { slidesPerView: 2, spaceBetween: 40 },
                  1250: { slidesPerView: 3, spaceBetween: 50 },
                  1450: { slidesPerView: 4, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className='mySwiper'
              >
                {authorBooks.map((authorBook, index) => (
                  <SwiperSlide
                    key={`author-book-${authorBook.isbn || index}-${index}`}
                  >
                    <BookCard variant='author' book={authorBook} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className='text-center py-8 text-black-50'>
                Pas d'autres livres de cet auteur
              </div>
            )}
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
