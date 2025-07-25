import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';
import { removeFromWishlistAsync } from '../../redux/features/wishlist/wishlistAsyncActions';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { addToLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

function BookInWishlist({ book, libraryBooks = [] }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemoveFromWishlist = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(removeFromWishlistAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for wishlist add:', error);
    }
  };

  const handleMoveToLibrary = async (book) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(addToLibraryAsync({ token, optimisticBook: book }));
      dispatch(removeFromWishlistAsync({ token, isbn: book.isbn }));
    } catch (error) {
      console.error('Error fetching token for moving to library:', error);
    }
  };

  const isInLibrary = libraryBooks.some(
    (libraryBook) => libraryBook.isbn === book.isbn
  );

  return (
    <div className='flex flex-col gap-2'>
      {/* Book Info */}
      <div className='flex w-[125px] h-[175px] relative flex-shrink-0 items-center justify-center'>
        {/* Spinner while image is loading */}
        {!imageLoaded && (
          <FaSpinner className='animate-spin text-xl text-black-50 absolute inset-0 m-auto' />
        )}
        <Link to={`/livres/${book.isbn}`}>
          <img
            src={book.cover}
            alt='Book Cover'
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ${
              !imageLoaded ? 'hidden' : ''
            }`}
            style={{ width: '125px', height: '175px' }}
          />
        </Link>

        {/* Delete Button */}
        <button
          onClick={() => handleRemoveFromWishlist(book.isbn)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black bg-white cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <IoIosRemoveCircle className='p-0.25' />
        </button>
      </div>

      {/* Library Button */}
      {isInLibrary ? (
        <button className='bg-secondary-btn text-black-75 hover:text-white-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[125px]'>
          <div className='flex gap-1 items-center justify-center'>
            <div className='text-body'>
              <FaCheckCircle />
            </div>
            Dans la bibli !
          </div>
        </button>
      ) : (
        <button
          onClick={() => handleMoveToLibrary(book)}
          className='cursor-pointer bg-primary-btn text-black-75 hover:text-white-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[125px] active:bg-black-75 active:text-white-100'
        >
          <div className='flex gap-1 items-center justify-center'>
            <div className='text-body'>
              <IoIosAddCircleOutline />
            </div>
            Ajouter à ma bibli
          </div>
        </button>
      )}
    </div>
  );
}
BookInWishlist.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    cover: PropTypes.string,
    // add other book properties as needed
  }).isRequired,
  libraryBooks: PropTypes.arrayOf(
    PropTypes.shape({
      isbn: PropTypes.string.isRequired,
      // add other libraryBook properties as needed
    })
  ),
};

export default BookInWishlist;
