import { useState, useEffect } from 'react';
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
  extractFullDate,
  getCoverUrl,
} from '../../utils/helper';
import PropTypes from 'prop-types';

function SingleGoogleBook({ book, libraryBooks = [], wishlistBooks = [] }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites) || [];

  // Derived states
  const isFavorite = favorites?.some((fav) => fav.isbn === book.isbn);
  const isInLibrary = libraryBooks.some(
    (libraryBook) => libraryBook.isbn === book.isbn
  );
  const isInWishlist = wishlistBooks.some(
    (wishlistBook) => wishlistBook.isbn === book.isbn
  );
  const isRead =
    libraryBooks.find((libraryBook) => libraryBook.isbn === book.isbn)
      ?.haveRead || false;

  // State to track image loading and screen size
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth < 640);

  // Process the cover URL
  const coverUrl = getCoverUrl(book.cover);

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

  // Define author click handler
  const handleAuthorClick = (author) => {
    navigate('/recherche', {
      state: { searchTerm: author, searchType: 'author' },
    });
  };

  const handleBookClick = (e) => {
    // Prevent default only if it's a navigation action and not on xs screens
    if (!isXsScreen && !e.target.closest('button')) {
      e.preventDefault();
      navigate(`/livres/${book.isbn}`);
    }
  };

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

  const handleFavorite = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(toggleFavoriteAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for toggling favorite:', error);
    }
  };

  // Convert HTML to plain text for detailed description
  const plainTextDescription = book.description
    ? book.description.replace(/<\/?[^>]+(>|$)/g, '')
    : 'Pas de description...';

  return (
    <>
      <div
        id='book-card'
        className='flex flex-col justify-between'
        onClick={handleBookClick}
      >
        <div className='flex gap-[24px]'>
          {/* Book Cover with spinner */}
          <div className='w-[220px] h-[330px] relative flex-shrink-0 items-center justify-center'>
            {!imageLoaded && (
              <FaSpinner className='animate-spin text-xl text-black-50' />
            )}
            <img
              src={coverUrl}
              alt='Couverture non disponible'
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full ${
                !imageLoaded ? 'hidden' : ''
              }`}
            />
          </div>

          {/* Book Details */}
          <div className='flex flex-col justify-center gap-2 w-full'>
            {/* Title */}
            <p className='text-h5 text-black-100'>{book.title}</p>

            {/* Authors */}
            {book.authors && (
              <p className='italic text-black-100 overflow-hidden'>
                {book.authors.slice(0, 3).map((author, index) => (
                  <span
                    key={author}
                    className='cursor-pointer hover:text-secondary-btn hover:underline'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAuthorClick(author);
                    }}
                  >
                    {author}
                    {index < book.authors.length - 1 && ', '}
                  </span>
                ))}
              </p>
            )}

            {/* Publisher */}
            <p className='text-small-body text-black-100'>
              Éditeur : <span className='text-black-85'>{book.publisher}</span>
            </p>

            {/* Published Date */}
            <p className='text-small-body text-black-100'>
              Publication :{' '}
              <span className='text-black-85'>
                {extractFullDate(book.publishedDate)}
              </span>
            </p>

            {/* Description */}
            <p className='w-full max-w-full md:max-w-[600px] h-auto md:h-[180px] overflow-hidden text-small-body text-black-85 text-justify'>
              {plainTextDescription && plainTextDescription.length > 580
                ? `${plainTextDescription.slice(0, 580)}...`
                : plainTextDescription || 'Pas de description...'}
            </p>
          </div>
        </div>

        {/* Action Buttons (only when user is logged in) */}
        {currentUser ? (
          <div className='flex gap-[24px] mt-6'>
            {/* Wishlist Button */}
            {isInWishlist ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromWishlist(book.isbn);
                }}
                className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaBookmark className='text-body' />
                  Wishlist
                </div>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(book);
                }}
                className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaRegBookmark className='text-body' />
                  Wishlist
                </div>
              </button>
            )}

            {/* Library Button */}
            {isInLibrary ? (
              isRead ? (
                <>
                  <button
                    className='bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[170px]'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className='flex gap-1 items-center justify-center'>
                      <FaCheckCircle className='text-body' />
                      J&apos;ai lu !
                    </div>
                  </button>
                  <Link
                    to={`/livres/${book.isbn}/edit`}
                    state={{ book }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className='cursor-pointer bg-black-10 text-black-75 text-small px-1 py-2.5 w-[50px] h-full hover:bg-secondary-btn'>
                      <div className='flex items-center justify-center'>
                        <FaPencilAlt className='text-body' />
                      </div>
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(book.isbn);
                    }}
                    className={`text-h4 rounded-full cursor-pointer hover:scale-150 transition-all duration-200 ${
                      isFavorite ? 'text-primary-btn' : 'text-black-75'
                    }`}
                  >
                    <FaHeart className='p-0.5' />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromLibrary(book.isbn);
                    }}
                    className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[170px]'
                  >
                    <div className='flex gap-1 items-center justify-center'>
                      <FaCheckCircle className='text-body' />
                      Bibli
                    </div>
                  </button>
                  <Link
                    to={`/livres/${book.isbn}/edit`}
                    state={{ book }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className='cursor-pointer bg-black-10 text-black-75 text-small px-1 py-2.5 w-[50px] h-full hover:bg-secondary-btn'>
                      <div className='flex items-center justify-center'>
                        <FaPencilAlt className='text-body' />
                      </div>
                    </button>
                  </Link>
                </>
              )
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToLibrary(book);
                }}
                className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <IoIosAddCircleOutline className='text-body' />
                  Bibli
                </div>
              </button>
            )}
          </div>
        ) : (
          <div className='flex gap-[16px] mt-2'>
            <Link to='/login'>
              <button
                onClick={(e) => e.stopPropagation()}
                className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <IoIosLogIn className='text-body' />
                  Se connecter
                </div>
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

SingleGoogleBook.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    publisher: PropTypes.string,
    publishedDate: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
  }).isRequired,
  libraryBooks: PropTypes.array,
  wishlistBooks: PropTypes.array,
};

export default SingleGoogleBook;
