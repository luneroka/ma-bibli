import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavbarSearch from '../../components/Navbar/NavbarSearch';
import SingleBookFromLibrary from './SingleBookFromLibrary';
import SingleBookFromApi from './SingleBookFromApi';
import FromSameAuthor from './FromSameAuthor';
import Footer from '../../components/Footer';
import { getSingleBookAsync } from '../../redux/features/single-book/singleBookAsyncActions';
import { FaSpinner } from 'react-icons/fa';

function SingleBookPage() {
  const { isbn } = useParams();
  const dispatch = useDispatch();
  const {
    book,
    status,
    error: bookError,
  } = useSelector((state) => state.singleBook);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);

  useEffect(() => {
    if (isbn) {
      dispatch(getSingleBookAsync(isbn));
    }
  }, [dispatch, isbn]);

  const isInLibrary = book
    ? libraryBooks.some((libraryBook) => libraryBook.isbn === book.isbn)
    : false;

  return (
    <>
      <NavbarSearch />
      <main className='flex-1 min-h-0 max-w-full mx-[32px] sm:mx-[64px] lg:mx-[128px] my-[32px] md:my-[48px] font-lato'>
        {status === 'loading' ? (
          <div className='flex items-center justify-center py-16'>
            <FaSpinner className='animate-spin text-3xl text-black-50' />
          </div>
        ) : bookError ? (
          <div className='text-center py-16 text-lg text-red-500'>
            {bookError || 'Error loading book details'}
          </div>
        ) : book ? (
          <>
            {isInLibrary ? (
              <SingleBookFromLibrary book={book} />
            ) : (
              <SingleBookFromApi book={book} />
            )}
            <FromSameAuthor />
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
