import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookAsync } from '../../redux/features/single-book/singleBookAsyncActions';
import NavbarLibrary from '../../components//Navbar/NavbarLibrary';
import Footer from '../../components/Footer';
import BookCard from '../../components/Book/BookCard';

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
      <main className='flex-1 min-h-0 max-w-full mx-[128px] mt-[96px] font-lato'>
        {book ? (
          <BookCard
            variant='single'
            book={book}
            libraryBooks={libraryBooks}
            readingListBooks={readingListBooks}
          />
        ) : (
          <div>No book data available</div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SingleBookPage;
