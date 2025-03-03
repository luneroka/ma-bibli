import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaRegBookmark,
  FaBookmark,
  FaCheckCircle,
  FaHeart,
  FaSpinner,
  FaPencilAlt,
} from 'react-icons/fa';
import { IoIosAddCircleOutline, IoIosLogIn } from 'react-icons/io';
import {
  addToLibraryAsync,
  removeFromLibraryAsync,
} from '../../redux/features/library/libraryAsyncActions';
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
} from '../../redux/features/wishlist/wishlistAsyncActions';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { useAuth } from '../../context/AuthContext';
import {
  formatNumber,
  extractYear,
  extractFullDate,
  getCoverUrl,
} from '../../utils/helper';

const BookCard = ({ book, libraryBooks = [], wishlistBooks = [] }) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites) || [];
  const isFavorite = favorites?.some((fav) => fav.isbn === book.isbn);
  const isRead =
    libraryBooks.find((libraryBook) => libraryBook.isbn === book.isbn)
      ?.haveRead || false;

  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToLibrary = async (book) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(addToLibraryAsync({ token, optimisticBook: book }));
    } catch (error) {
      console.error('Error fetching token for library add:', error);
    }
  };

  const handleRemoveFromLibrary = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(removeFromLibraryAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for library delete:', error);
    }
  };

  const handleAddToWishlist = async (book) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(addToWishlistAsync({ token, optimisticBook: book }));
    } catch (error) {
      console.error('Error fetching token for wishlist add:', error);
    }
  };

  const handleRemoveFromWishlist = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(removeFromWishlistAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for wishlist delete:', error);
    }
  };

  const handleAuthorClick = (author) => {
    navigate('/recherche', {
      state: { searchTerm: author, searchType: 'author' },
    });
  };

  const handleFavorite = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(toggleFavoriteAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for toggling favorite:', error);
    }
  };

  const isInLibrary = libraryBooks.some(
    (libraryBook) => libraryBook.isbn === book.isbn
  );
  const isInWishlist = wishlistBooks.some(
    (wishlistBook) => wishlistBook.isbn === book.isbn
  );

  // Convert HTML to plain text for detailed description
  const plainTextDescription = book.description
    ? book.description.replace(/<\/?[^>]+(>|$)/g, '')
    : 'Pas de description...';

  // Add state to track screen size
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth < 640);

  // Add effect to update screen size state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle book click with screen size check
  const handleBookClick = (e) => {
    // Prevent default only if it's a navigation action and not on xs screens
    if (!isXsScreen && !e.target.closest('button')) {
      e.preventDefault();
      navigate(`/livres/${book.isbn}`);
    }
  };

  return (
    <>
      <div id='book-card' className='flex flex-col justify-between'>
        <div className='flex gap-[24px]'>
          {/* Book Cover with loading spinner */}
          <div className='flex w-[121px] h-[170px] relative flex-shrink-0 items-center justify-center'>
            {!imageLoaded && (
              <FaSpinner className='animate-spin text-xl text-black-50' />
            )}
            <div
              className={`book-card ${isXsScreen ? 'pointer-events-none' : ''}`}
              onClick={handleBookClick}
              onTouchEnd={handleBookClick}
              role='button'
              tabIndex={0}
            >
              {isXsScreen ? (
                <img
                  src={book.cover || '../../../public/product-not-found.png'}
                  alt='Couverture non disponible'
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full ${!imageLoaded ? 'hidden' : ''}`}
                  style={{ width: '121px', height: '170px' }}
                />
              ) : (
                <Link to={`/livres/${book.isbn}`}>
                  <img
                    src={book.cover || '../../../public/product-not-found.png'}
                    alt='Couverture non disponible'
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ${
                      !imageLoaded ? 'hidden' : ''
                    }`}
                    style={{ width: '121px', height: '170px' }}
                  />
                </Link>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className='flex flex-col justify-center w-[220px] h-[170px]'>
            {/* Title */}
            <Link to={`/livres/${book.isbn}`}>
              <p className='text-small-body text-black-75 hover:text-black font-bold leading-4.5 overflow-hidden mb-2 text-pretty'>
                {book.title.length > 40
                  ? `${book.title.slice(0, 40)}...`
                  : book.title}
              </p>
            </Link>

            {/* Authors */}
            <div>
              {book.authors &&
                book.authors.slice(0, 2).map((author) => (
                  <p
                    key={author}
                    className='text-small text-black-75 cursor-pointer hover:text-secondary-btn hover:underline overflow-hidden'
                    onClick={() => handleAuthorClick(author)}
                  >
                    {author.length > 30 ? `${author.slice(0, 30)}...` : author}
                  </p>
                ))}
            </div>

            {/* Publisher */}
            <div className='text-small text-black-50'>
              {book.publisher && book.publisher.length > 15
                ? `${book.publisher.slice(0, 30)}...`
                : book.publisher}
            </div>

            {/* Published Date */}
            <p className='text-small text-black-50'>
              Publication : {extractYear(book.publishedDate)}
            </p>

            {/* Page Count */}
            <p className='text-small text-black-50'>
              Pages : {formatNumber(book.pageCount)}
            </p>
          </div>
        </div>

        {/* Action Buttons (only when user is logged in) */}
        {currentUser ? (
          <div className='flex gap-[16px] mt-2'>
            {/* wishlist List Button */}
            {isInWishlist ? (
              <button
                onClick={() => handleRemoveFromWishlist(book.isbn)}
                className='cursor-pointer bg-secondary-btn text-black-75 px-1 py-1.5 w-[121px]'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <FaBookmark className='text-body' />
                  Wishlist
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleAddToWishlist(book)}
                className='cursor-pointer bg-primary-btn text-black-75 px-1 py-1.5 w-[121px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <FaRegBookmark className='text-body' />
                  Wishlist
                </div>
              </button>
            )}

            {/* Library Button */}
            {isInLibrary ? (
              isRead ? (
                <button className='bg-secondary-btn text-black-75 px-1 py-1.5 w-[125px]'>
                  <div className='flex gap-1 items-center justify-center text-xs'>
                    <FaCheckCircle className='text-body' />
                    J'ai lu !
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => handleRemoveFromLibrary(book.isbn)}
                  className='cursor-pointer bg-secondary-btn text-black-75 px-1 py-1.5 w-[125px]'
                >
                  <div className='flex gap-1 items-center justify-center text-xs'>
                    <FaCheckCircle className='text-body' />
                    Bibli
                  </div>
                </button>
              )
            ) : (
              <button
                onClick={() => handleAddToLibrary(book)}
                className='cursor-pointer bg-primary-btn text-black-75 px-1 py-1.5 w-[125px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <IoIosAddCircleOutline className='text-body' />
                  Bibli
                </div>
              </button>
            )}
          </div>
        ) : (
          <div className='flex gap-[16px] mt-2'>
            <button
              onClick={() => handleAddToLibrary(book)}
              className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[125px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
            >
              <Link to='/login'>
                <div className='flex gap-1 items-center justify-center'>
                  <IoIosLogIn className='text-body' />
                  Se connecter
                </div>
              </Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookCard;
