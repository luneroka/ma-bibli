import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchAuthorAsync } from '../../redux/features/search/searchAsyncActions';
import { FaSpinner } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookAuthor from '../../components/Book/BookAuthor';
import { getApiPath } from '../../utils/apiConfig';

function FromSameAuthor() {
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const { book, error: bookError } = useSelector((state) => state.singleBook);

  // Local state
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET FROM SAME AUTHORS
  const searchAuthorBooks = (authorName) => {
    setIsLoading(true);
    setAuthorBooks([]);

    dispatch(
      createSearchAuthorAsync(
        'searchAuthor',
        getApiPath('/api/search/author')
      )(authorName)
    )
      .unwrap()
      .then((data) => {
        if (!data?.items) {
          setAuthorBooks([]);
          setIsLoading(false);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Search author error:', error);
        setError(error.message || 'Failed to fetch author books');
        setAuthorBooks([]);
        setIsLoading(false);
      });
  };

  // Trigger search when book data is available
  useEffect(() => {
    if (book?.authors && book.authors.length > 0) {
      // Use primary author for search
      searchAuthorBooks(book.authors[0]);
    } else {
      setIsLoading(false);
    }
  }, [book]);

  return (
    <>
      <h2 className='mt-[64px] mb-[32px] font-merriweather text-h6 text-black-100'>
        Du même auteur
      </h2>

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
                  <BookAuthor book={authorBook} />
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
        <div className='text-center py-16 text-lg'>No book data available</div>
      )}
    </>
  );
}

export default FromSameAuthor;
