import React from 'react';
import {
  FaRegBookmark,
  FaBookmark,
  FaCheckCircle,
  FaHeart,
} from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addToLibraryAsync,
  removeFromLibraryAsync,
} from '../../redux/features/library/libraryAsyncActions';
import {
  addToReadingListAsync,
  removeFromReadingListAsync,
} from '../../redux/features/reading-list/readingListAsyncActions';
import { formatNumber, extractYear, extractFullDate } from '../../utils/helper';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';

const BookCard = ({
  book,
  libraryBooks = [],
  readingListBooks = [],
  variant = 'card',
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.favorites) || [];
  const isFavorite = favorites?.some((fav) => fav.isbn === book.isbn);

  const handleAddToLibrary = (book) => {
    dispatch(addToLibraryAsync(book));
  };

  const handleRemoveFromLibrary = (isbn) => {
    dispatch(removeFromLibraryAsync(isbn));
  };

  const handleAddToReadingList = (book) => {
    dispatch(addToReadingListAsync(book));
  };

  const handleRemoveFromReadingList = (isbn) => {
    dispatch(removeFromReadingListAsync(isbn));
  };

  const handleAuthorClick = (author) => {
    navigate('/recherche', {
      state: { searchTerm: author, searchType: 'author' },
    });
  };

  const handleFavorite = (isbn) => {
    dispatch(toggleFavoriteAsync(isbn));
  };

  const isInLibrary = libraryBooks.some(
    (libraryBook) => libraryBook.isbn === book.isbn
  );
  const isInReadingList = readingListBooks.some(
    (readingListBook) => readingListBook.isbn === book.isbn
  );

  // Convert HTML to plain text for detailed description
  const plainTextDescription =
    book.description && variant === 'single'
      ? book.description.replace(/<\/?[^>]+(>|$)/g, '')
      : null;

  return (
    <div id='book-card' className='flex flex-col justify-between'>
      {/* BOOK CARD */}
      {variant === 'card' ? (
        <>
          <div className='flex gap-[24px]'>
            {/* Book Cover */}
            <div className='flex w-[121px] h-[170px] flex-shrink-0 items-center'>
              <Link to={`/livres/${book.isbn}`}>
                <img
                  src={book.cover || '../../../public/product-not-found.png'}
                  alt='Couverture non disponible'
                  className='w-full h-full cursor-pointer hover:scale-105 transition-all duration-200'
                  style={{ width: '121px', height: '170px' }}
                />
              </Link>
            </div>

            {/* Book Details */}
            <div className='flex flex-col justify-between w-[220px] h-[170px]'>
              {/* Title */}
              <Link to={`/livres/${book.isbn}`}>
                <p className='text-small-body text-black-75 hover:text-black font-bold leading-4.5 h-[41px] overflow-hidden'>
                  {book.title.length > 55
                    ? `${book.title.slice(0, 55)}...`
                    : book.title}
                </p>
              </Link>

              {/* Authors */}
              <div>
                {book.authors &&
                  book.authors.slice(0, 3).map((author) => (
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

          {/* Action Buttons */}
          <div className='flex gap-[16px] mt-2'>
            {/* Reading List Button */}
            {isInReadingList ? (
              <button
                onClick={() => handleRemoveFromReadingList(book.isbn)}
                className='cursor-pointer bg-secondary-btn text-black-75 text-xs px-1 py-1.5 w-[121px]'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaBookmark className='text-body' />
                  Dans la liste !
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleAddToReadingList(book)}
                className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[121px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaRegBookmark className='text-body' />
                  Liste de lecture
                </div>
              </button>
            )}

            {/* Library Button */}
            {isInLibrary ? (
              <button
                onClick={() => handleRemoveFromLibrary(book.isbn)}
                className='cursor-pointer bg-secondary-btn text-black-75 text-xs px-1 py-1.5 w-[125px]'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaCheckCircle className='text-body' />
                  Dans la bibli !
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleAddToLibrary(book)}
                className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 w-[125px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <IoIosAddCircleOutline className='text-body' />
                  Ajouter à ma bibli
                </div>
              </button>
            )}
          </div>
        </>
      ) : (
        // SINGLE BOOK CARD
        <>
          <div className='flex gap-[24px]'>
            {/* Book Cover */}
            <div className='w-[220px] h-[330px] flex-shrink-0'>
              <img
                src={book.cover || '../../../public/product-not-found.png'}
                alt='Couverture non disponible'
                className='w-full h-full'
              />
            </div>

            {/* Book Details */}
            <div className='flex flex-col justify-between w-full'>
              {/* Title */}
              <p className='text-h5 text-black'>{book.title}</p>

              {/* Authors */}
              {book.authors && (
                <p className='italic text-black overflow-hidden'>
                  {book.authors.slice(0, 3).map((author, index) => (
                    <span
                      key={author}
                      className='cursor-pointer hover:text-secondary-btn hover:underline'
                      onClick={() => handleAuthorClick(author)}
                    >
                      {author}
                      {index < book.authors.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}

              {/* Publisher */}
              <p className='text-small-body text-black'>
                Éditeur :{' '}
                <span className='text-black-85'>{book.publisher}</span>
              </p>

              {/* Published Date */}
              <p className='text-small-body text-black'>
                Publication :{' '}
                <span className='text-black-85'>
                  {extractFullDate(book.publishedDate)}
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

          {/* Action Buttons */}
          <div className='flex gap-[24px] mt-6'>
            {/* Reading List Button */}
            {isInReadingList ? (
              <button
                onClick={() => handleRemoveFromReadingList(book.isbn)}
                className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaBookmark className='text-body' />
                  Dans la liste !
                </div>
              </button>
            ) : (
              <button
                onClick={() => handleAddToReadingList(book)}
                className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <FaRegBookmark className='text-body' />
                  Liste de lecture
                </div>
              </button>
            )}

            {/* Library Button */}
            {isInLibrary ? (
              <>
                <button
                  onClick={() => handleRemoveFromLibrary(book.isbn)}
                  className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 w-[220px]'
                >
                  <div className='flex gap-1 items-center justify-center'>
                    <FaCheckCircle className='text-body' />
                    Dans la bibli !
                  </div>
                </button>
                <button
                  onClick={() => handleFavorite(book.isbn)}
                  className={`text-h4 rounded-full cursor-pointer hover:scale-150 transition-all duration-200 ${
                    isFavorite ? 'text-primary-btn' : 'text-black-75'
                  }`}
                >
                  <FaHeart className={`p-0.5`} />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleAddToLibrary(book)}
                className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 w-[220px] hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
              >
                <div className='flex gap-1 items-center justify-center'>
                  <IoIosAddCircleOutline className='text-body' />
                  Ajouter à ma bibli
                </div>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;
