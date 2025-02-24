import React, { useState, useEffect } from 'react';
import {
  FaRegBookmark,
  FaBookmark,
  FaCheckCircle,
  FaHeart,
  FaSpinner,
} from 'react-icons/fa';
import { IoIosAddCircleOutline, IoIosLogIn } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addToLibraryAsync,
  removeFromLibraryAsync,
} from '../../redux/features/library/libraryAsyncActions';
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
} from '../../redux/features/wishlist/wishlistAsyncActions';
import { formatNumber, extractYear, extractFullDate } from '../../utils/helper';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { useAuth } from '../../context/AuthContext';

const BookCard = ({ book, variant, libraryBooks = [], wishlistBooks = [] }) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites) || [];
  const isFavorite = favorites?.some((fav) => fav.isbn === book.isbn);
  const isRead =
    libraryBooks.find((libraryBook) => libraryBook.isbn === book.isbn)
      ?.haveRead || false;

  // New state to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  // For variant "perso", fetch the latest book data from the db.
  const [dbBook, setDbBook] = useState(book);
  useEffect(() => {
    if (variant === 'perso' && currentUser) {
      const fetchBookFromDb = async () => {
        try {
          const token = await currentUser.getIdToken();
          const response = await fetch(
            `http://localhost:3000/api/library/book/${book.isbn}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setDbBook(data.book);
          } else {
            console.error('Failed to fetch book from db', response.statusText);
          }
        } catch (err) {
          console.error('Error fetching book from db', err);
        }
      };
      fetchBookFromDb();
    }
  }, [variant, book.isbn, currentUser]);

  // Use dbBook (if fetched) when variant is "perso"; fallback to props.book otherwise.
  const displayBook = variant === 'perso' ? dbBook : book;

  // Helper: Get correct cover URL
  const getCoverUrl = (cover) => {
    if (!cover) return '/product-not-found.png';
    // If already an absolute URL, return as is.
    if (cover.startsWith('http://') || cover.startsWith('https://'))
      return cover;

    // If uploaded cover from our backend, append timestamp to bust cache.
    if (cover.startsWith('/uploads/')) {
      return `http://localhost:3000${cover}?t=${Date.now()}`;
    }

    // If coming from our proxy, prepend backend host.
    if (cover.startsWith('/api/proxy-image')) {
      return `http://localhost:3000${cover}`;
    }

    // Fallback for any other type.
    return cover;
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
    (libraryBook) => libraryBook.isbn === displayBook.isbn
  );
  const isInWishlist = wishlistBooks.some(
    (wishlistBook) => wishlistBook.isbn === displayBook.isbn
  );

  // Convert HTML to plain text for detailed description
  const plainTextDescription = displayBook.description
    ? displayBook.description.replace(/<\/?[^>]+(>|$)/g, '')
    : 'Pas de description...';

  if (variant === 'card') {
    return (
      <>
        <div id='book-card' className='flex flex-col justify-between'>
          <div className='flex gap-[24px]'>
            {/* Book Cover with loading spinner */}
            <div className='flex w-[121px] h-[170px] relative flex-shrink-0 items-center justify-center'>
              {!imageLoaded && (
                <FaSpinner className='animate-spin text-xl text-black-50' />
              )}
              <Link to={`/livres/${displayBook.isbn}`}>
                <img
                  src={
                    displayBook.cover || '../../../public/product-not-found.png'
                  }
                  alt='Couverture non disponible'
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ${
                    !imageLoaded ? 'hidden' : ''
                  }`}
                  style={{ width: '121px', height: '170px' }}
                />
              </Link>
            </div>

            {/* Book Details */}
            <div className='flex flex-col justify-center w-[220px] h-[170px]'>
              {/* Title */}
              <Link to={`/livres/${displayBook.isbn}`}>
                <p className='text-small-body text-black-75 hover:text-black font-bold leading-4.5 overflow-hidden mb-2 text-pretty'>
                  {displayBook.title.length > 40
                    ? `${displayBook.title.slice(0, 40)}...`
                    : displayBook.title}
                </p>
              </Link>

              {/* Authors */}
              <div>
                {displayBook.authors &&
                  displayBook.authors.slice(0, 2).map((author) => (
                    <p
                      key={author}
                      className='text-small text-black-75 cursor-pointer hover:text-secondary-btn hover:underline overflow-hidden'
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author.length > 30
                        ? `${author.slice(0, 30)}...`
                        : author}
                    </p>
                  ))}
              </div>

              {/* Publisher */}
              <div className='text-small text-black-50'>
                {displayBook.publisher && displayBook.publisher.length > 15
                  ? `${displayBook.publisher.slice(0, 30)}...`
                  : displayBook.publisher}
              </div>

              {/* Published Date */}
              <p className='text-small text-black-50'>
                Publication : {extractYear(displayBook.publishedDate)}
              </p>

              {/* Page Count */}
              <p className='text-small text-black-50'>
                Pages : {formatNumber(displayBook.pageCount)}
              </p>
            </div>
          </div>

          {/* Action Buttons (only when user is logged in) */}
          {currentUser ? (
            <div className='flex gap-[16px] mt-2'>
              {/* wishlist List Button */}
              {isInWishlist ? (
                <button
                  onClick={() => handleRemoveFromWishlist(displayBook.isbn)}
                  className='cursor-pointer bg-secondary-btn text-black-75 px-1 py-1.5 w-[121px]'
                >
                  <div className='flex gap-1 items-center justify-center text-xs'>
                    <FaBookmark className='text-body' />
                    Wishlist
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => handleAddToWishlist(displayBook)}
                  className='cursor-pointer bg-primary-btn text-black-75 px-1 py-1.5 w-[121px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
                    onClick={() => handleRemoveFromLibrary(displayBook.isbn)}
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
                  onClick={() => handleAddToLibrary(displayBook)}
                  className='cursor-pointer bg-primary-btn text-black-75 px-1 py-1.5 w-[125px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
                onClick={() => handleAddToLibrary(displayBook)}
                className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[125px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
  } else if (variant === 'single') {
    return (
      <>
        <div id='book-card' className='flex flex-col justify-between'>
          <div className='flex gap-[24px]'>
            {/* Book Cover with spinner */}
            <div className='w-[220px] h-[330px] relative flex-shrink-0 flex items-center justify-center'>
              {!imageLoaded && (
                <FaSpinner className='animate-spin text-xl text-black-50' />
              )}
              <img
                src={
                  displayBook.cover || '../../../public/product-not-found.png'
                }
                alt='Couverture non disponible'
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full ${!imageLoaded ? 'hidden' : ''}`}
              />
            </div>

            {/* Book Details */}
            <div className='flex flex-col justify-between w-full'>
              {/* Title */}
              <p className='text-h5 text-black'>{displayBook.title}</p>

              {/* Authors */}
              {displayBook.authors && (
                <p className='italic text-black overflow-hidden'>
                  {displayBook.authors.slice(0, 3).map((author, index) => (
                    <span
                      key={author}
                      className='cursor-pointer hover:text-secondary-btn hover:underline'
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                      {index < displayBook.authors.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}

              {/* Publisher */}
              <p className='text-small-body text-black'>
                Éditeur :{' '}
                <span className='text-black-85'>{displayBook.publisher}</span>
              </p>

              {/* Published Date */}
              <p className='text-small-body text-black'>
                Publication :{' '}
                <span className='text-black-85'>
                  {extractFullDate(displayBook.publishedDate)}
                </span>
              </p>

              {/* Description */}
              <p className='h-[180px] max-w-[600px] text-small-body text-black-85 text-justify'>
                {plainTextDescription && plainTextDescription.length > 580
                  ? `${plainTextDescription.slice(0, 580)}...`
                  : plainTextDescription || 'Pas de description...'}
              </p>
            </div>
          </div>

          {/* Action Buttons (only when user is logged in) */}
          {currentUser ? (
            <div className='flex gap-[24px] mt-6'>
              {/* wishlist List Button */}
              {isInWishlist ? (
                <button
                  onClick={() => handleRemoveFromWishlist(displayBook.isbn)}
                  className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
                >
                  <div className='flex gap-1 items-center justify-center'>
                    <FaBookmark className='text-body' />
                    Wishlist
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => handleAddToWishlist(displayBook)}
                  className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
                    <button className='bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'>
                      <div className='flex gap-1 items-center justify-center'>
                        <FaCheckCircle className='text-body' />
                        J'ai lu !
                      </div>
                    </button>
                    <button
                      onClick={() => handleFavorite(displayBook.isbn)}
                      className={`text-h4 rounded-full cursor-pointer hover:scale-150 transition-all duration-200 ${
                        isFavorite ? 'text-primary-btn' : 'text-black-75'
                      }`}
                    >
                      <FaHeart className='p-0.5' />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleRemoveFromLibrary(displayBook.isbn)}
                    className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
                  >
                    <div className='flex gap-1 items-center justify-center'>
                      <FaCheckCircle className='text-body' />
                      Bibli
                    </div>
                  </button>
                )
              ) : (
                <button
                  onClick={() => handleAddToLibrary(displayBook)}
                  className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
              <button
                onClick={() => handleAddToLibrary(displayBook)}
                className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
  } else if (variant === 'perso') {
    return (
      <>
        <div id='book-card' className='flex flex-col justify-between'>
          <div className='flex gap-[24px]'>
            {/* Book Cover with spinner */}
            <div className='w-[220px] h-[330px] relative flex-shrink-0 flex items-center justify-center'>
              {!imageLoaded && (
                <FaSpinner className='animate-spin text-xl text-black-50' />
              )}
              <img
                src={getCoverUrl(displayBook.cover)}
                alt='Couverture non disponible'
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full ${!imageLoaded ? 'hidden' : ''}`}
              />
            </div>

            {/* Book Details */}
            <div className='flex flex-col justify-between w-full'>
              {/* Title */}
              <p className='text-h5 text-black'>{displayBook.title}</p>

              {/* Authors */}
              {displayBook.authors && (
                <p className='italic text-black overflow-hidden'>
                  {displayBook.authors.slice(0, 3).map((author, index) => (
                    <span
                      key={author}
                      className='cursor-pointer hover:text-secondary-btn hover:underline'
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                      {index < displayBook.authors.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}

              {/* Publisher */}
              <p className='text-small-body text-black'>
                Éditeur :{' '}
                <span className='text-black-85'>{displayBook.publisher}</span>
              </p>

              {/* Published Date */}
              <p className='text-small-body text-black'>
                Publication :{' '}
                <span className='text-black-85'>
                  {extractFullDate(displayBook.publishedDate)}
                </span>
              </p>

              {/* Description */}
              <p className='h-[180px] max-w-[600px] text-small-body text-black-85 text-justify'>
                {plainTextDescription && plainTextDescription.length > 580
                  ? `${plainTextDescription.slice(0, 580)}...`
                  : plainTextDescription || 'Pas de description...'}
              </p>
            </div>
          </div>

          {/* Action Buttons (only when user is logged in) */}
          {currentUser ? (
            <div className='flex gap-[24px] mt-6'>
              {/* wishlist List Button */}
              {isInWishlist ? (
                <button
                  onClick={() => handleRemoveFromWishlist(displayBook.isbn)}
                  className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
                >
                  <div className='flex gap-1 items-center justify-center'>
                    <FaBookmark className='text-body' />
                    Wishlist
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => handleAddToWishlist(displayBook)}
                  className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
                    <button className='bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'>
                      <div className='flex gap-1 items-center justify-center'>
                        <FaCheckCircle className='text-body' />
                        J'ai lu !
                      </div>
                    </button>
                    <button
                      onClick={() => handleFavorite(displayBook.isbn)}
                      className={`text-h4 rounded-full cursor-pointer hover:scale-150 transition-all duration-200 ${
                        isFavorite ? 'text-primary-btn' : 'text-black-75'
                      }`}
                    >
                      <FaHeart className='p-0.5' />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleRemoveFromLibrary(displayBook.isbn)}
                    className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
                  >
                    <div className='flex gap-1 items-center justify-center'>
                      <FaCheckCircle className='text-body' />
                      Bibli
                    </div>
                  </button>
                )
              ) : (
                <button
                  onClick={() => handleAddToLibrary(displayBook)}
                  className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
              <button
                onClick={() => handleAddToLibrary(displayBook)}
                className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
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
  } else if (variant === 'author') {
    return (
      <>
        <div id='book-card' className='flex flex-col justify-between'>
          <div className='flex gap-[24px]'>
            {/* Book Cover */}
            <div className='flex w-[121px] h-[170px] flex-shrink-0 items-center'>
              <Link to={`/livres/${displayBook.isbn}`}>
                <img
                  src={
                    displayBook.cover || '../../../public/product-not-found.png'
                  }
                  alt='Couverture non disponible'
                  className='w-full h-full cursor-pointer hover:scale-105 transition-all duration-200'
                  style={{ width: '121px', height: '170px' }}
                />
              </Link>
            </div>

            {/* Book Details */}
            <div className='flex flex-col justify-center w-[220px] h-[170px]'>
              {/* Title */}
              <Link to={`/livres/${displayBook.isbn}`}>
                <p className='text-small-body text-black-75 hover:text-black font-bold leading-4.5 overflow-hidden mb-2 text-pretty'>
                  {displayBook.title.length > 40
                    ? `${displayBook.title.slice(0, 40)}...`
                    : displayBook.title}
                </p>
              </Link>

              {/* Authors */}
              <div>
                {displayBook.authors &&
                  displayBook.authors.slice(0, 2).map((author) => (
                    <p
                      key={author}
                      className='text-small text-black-75 cursor-pointer hover:text-secondary-btn hover:underline overflow-hidden'
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author.length > 30
                        ? `${author.slice(0, 30)}...`
                        : author}
                    </p>
                  ))}
              </div>

              {/* Publisher */}
              <div className='text-small text-black-50'>
                {displayBook.publisher && displayBook.publisher.length > 15
                  ? `${displayBook.publisher.slice(0, 30)}...`
                  : displayBook.publisher}
              </div>

              {/* Published Date */}
              <p className='text-small text-black-50'>
                Publication : {extractYear(displayBook.publishedDate)}
              </p>

              {/* Page Count */}
              <p className='text-small text-black-50'>
                Pages : {formatNumber(displayBook.pageCount)}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default BookCard;
