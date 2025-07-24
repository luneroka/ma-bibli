import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SingleLibraryBook from '../../components/SingleBook/SingleLibraryBook';
import SmallLibraryBook from '../../components/SingleBook/SmallLibraryBook';
import PropTypes from 'prop-types';

function SingleBookFromLibrary({ book }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  // Find the matching book from the library database
  const libraryBook = libraryBooks.find(
    (libBook) => libBook.isbn === book.isbn
  );

  // Use library version if available, otherwise use the provided book
  const displayBook = libraryBook || book;

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 752);

  // Add effect to update screen size state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 752);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <SmallLibraryBook
          book={displayBook}
          libraryBooks={libraryBooks}
          wishlistBooks={wishlistBooks}
        />
      ) : (
        <SingleLibraryBook
          book={displayBook}
          libraryBooks={libraryBooks}
          wishlistBooks={wishlistBooks}
        />
      )}
    </>
  );
}

SingleBookFromLibrary.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string,
  }).isRequired,
};

export default SingleBookFromLibrary;
