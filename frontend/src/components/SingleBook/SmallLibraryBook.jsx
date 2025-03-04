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

function SmallLibraryBook({ book }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux store
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];
  const wishlistBooks =
    useSelector((state) => state.wishlist.wishlistBooks) || [];
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

  // State to track image loading
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

  const handleBookClick = (e) => {
    // Prevent default only if it's a navigation action and not on xs screens
    if (!isXsScreen && !e.target.closest('button')) {
      e.preventDefault();
      navigate(`/livres/${book.isbn}`);
    }
  };

  const handleAuthorClick = (author) => {
    navigate('/recherche', {
      state: { searchTerm: author, searchType: 'author' },
    });
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
        <div className='flex gap-[16px]'>
          {/* Book Cover with spinner */}
          <div className='flex w-[121px] h-[170px] relative flex-shrink-0 items-center justify-center'>
            {!imageLoaded && (
              <FaSpinner className='animate-spin text-xl text-black-50' />
            )}
            <img
              src={coverUrl}
              alt='Couverture non disponible'
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full ${!imageLoaded ? 'hidden' : ''}`}
              style={{ width: '121px', height: '170px' }}
            />
          </div>

          {/* Book Details */}
          <div className='flex flex-col justify-center gap-2 w-full'>
            {/* Title */}
            <p className='text-h6 text-black-100'>{book.title}</p>

            {/* Authors */}
            {book.authors && (
              <p className='text-small-body italic text-black-100 overflow-hidden'>
                {book.authors.slice(0, 2).map((author, index) => (
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
            <p className='text-small text-black-100'>
              Éditeur : <span className='text-black-85'>{book.publisher}</span>
            </p>

            {/* Published Date */}
            <p className='text-small text-black-100'>
              Publication :{' '}
              <span className='text-black-85'>
                {extractFullDate(book.publishedDate)}
              </span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className='w-full max-w-full md:max-w-[600px] h-auto overflow-hidden text-small text-black-85 text-justify mt-4'>
          {plainTextDescription && plainTextDescription.length > 580
            ? `${plainTextDescription.slice(0, 580)}...`
            : plainTextDescription || 'Pas de description...'}
        </p>

        {/* Action Buttons */}
        {currentUser ? (
          <div className='flex gap-[16px] mt-4'>
            {/* wishlist List Button */}
            {isInWishlist ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromWishlist(book.isbn);
                }}
                className='cursor-pointer bg-secondary-btn text-black-75 px-1 py-1.5 w-[121px]'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
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
                <>
                  <button className='bg-secondary-btn text-black-75 px-1 py-1.5 w-[125px]'>
                    <div className='flex gap-1 items-center justify-center text-xs'>
                      <FaCheckCircle className='text-body' />
                      J'ai lu !
                    </div>
                  </button>
                  <Link
                    to={`/livres/${book.isbn}/edit`}
                    state={{ book }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className='cursor-pointer bg-black-10 text-black-75 text-small px-1 py-1.5 w-[50px] h-full hover:bg-secondary-btn'>
                      <div className='flex items-center justify-center text-xs'>
                        <FaPencilAlt className='text-body' />
                      </div>
                    </button>
                  </Link>
                  {/*                   <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(book.isbn);
                    }}
                    className={`text-h4 rounded-full cursor-pointer hover:scale-150 transition-all duration-200 ${
                      isFavorite ? 'text-primary-btn' : 'text-black-75'
                    }`}
                  >
                    <FaHeart className='p-0.5' />
                  </button> */}
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromLibrary(book.isbn);
                    }}
                    className='cursor-pointer bg-secondary-btn text-black-75 px-1 py-1.5 w-[125px]'
                  >
                    <div className='flex gap-1 items-center justify-center text-xs'>
                      <FaCheckCircle className='text-body' />
                      Bibli
                    </div>
                  </button>
                  <Link
                    to={`/livres/${book.isbn}/edit`}
                    state={{ book }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className='cursor-pointer bg-black-10 text-black-75 text-small px-1 py-1.5 w-[50px] h-full hover:bg-secondary-btn'>
                      <div className='flex items-center justify-center text-xs'>
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
              onClick={(e) => e.stopPropagation()}
              className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[125px] hover:bg-secondary-btn active:bg-black-75 active:text-white-100'
            >
              <Link to='/login'>
                <div className='flex gap-1 items-center justify-center text-xs'>
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
}

export default SmallLibraryBook;
