import React from 'react';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addToLibraryAsync,
  removeFromLibraryAsync,
} from '../../utils/libraryAsyncActions';
import {
  addToReadingListAsync,
  removeFromReadingListAsync,
} from '../../utils/readingListAsyncActions';
import { formatNumber, extractYear } from '../../utils/helpers';

const BookCard = ({ book, libraryBooks = [], readingListBooks = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToLibrary = (book) => {
    dispatch(addToLibraryAsync(book));
  };

  const handleRemoveFromLibrary = (bookId) => {
    dispatch(removeFromLibraryAsync(bookId));
  };

  const handleAddToReadingList = (book) => {
    dispatch(addToReadingListAsync(book));
  };

  const handleRemoveFromReadingList = (bookId) => {
    dispatch(removeFromReadingListAsync(bookId));
  };

  const isInLibrary = libraryBooks.some(
    (libraryBook) => libraryBook.id === book.id
  );
  const isInReadingList = readingListBooks.some(
    (readingListBook) => readingListBook.id === book.id
  );

  const handleAuthorClick = (author) => {
    navigate('/recherche', {
      state: { searchTerm: author, searchType: 'author' },
    });
  };

  return (
    <>
      <div id='book-card' className='flex flex-col justify-between'>
        {/* Book Info */}
        <div className='flex gap-[24px]'>
          {/* Book Cover */}
          <div className='flex w-[121px] h-[170px] gap-[16px] flex-shrink-0 items-center'>
            <Link to={`/livres/${book.id}`}>
              <img
                src={
                  book.volumeInfo.imageLinks
                    ? Object.entries(book.volumeInfo.imageLinks)[0]?.[1]
                    : '../../../public/product-not-found.png'
                }
                alt='Couverture non disponible'
                className='w-full h-full cursor-pointer hover:scale-105 transition-all duration-200'
                style={{ width: '121px', height: '170px' }}
              />
            </Link>
          </div>

          {/* Book Details */}
          <div className='flex flex-col justify-between w-[220px] h-[170px]'>
            {/* Book Title */}
            <Link to={`/livres/${book.id}`}>
              <p className='text-small-body text-black-75 hover:text-black font-bold text-pretty leading-4.5 h-[41px] content-center overflow-hidden'>
                {book.volumeInfo.title.length > 55
                  ? `${book.volumeInfo.title.slice(0, 55)}...`
                  : book.volumeInfo.title}
              </p>
            </Link>

            {/* Book Author */}
            <div>
              {book.volumeInfo.authors &&
                book.volumeInfo.authors.slice(0, 3).map((author) => (
                  <p
                    key={author}
                    className='text-small text-black-75 overflow-hidden cursor-pointer hover:text-secondary-btn hover:underline'
                    onClick={() => handleAuthorClick(author)}
                  >
                    {author.length > 30 ? `${author.slice(0, 30)}...` : author}
                  </p>
                ))}
            </div>

            {/* Book Published Date */}
            <p className='text-small text-black-50 overflow-hidden'>
              Publication : {extractYear(book.volumeInfo.publishedDate)}
            </p>

            {/* Book Page Count */}
            <p className='text-small text-black-50 overflow-hidden'>
              Pages : {formatNumber(book.volumeInfo.pageCount)}
            </p>
          </div>
        </div>

        {/* Button section */}
        <div className='flex gap-[16px] mt-2 justify-start'>
          {/* Reading List Button */}
          {isInReadingList ? (
            <button
              onClick={() => handleRemoveFromReadingList(book.id)}
              className='cursor-pointer bg-secondary-btn text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[121px]'
            >
              <div className='flex gap-1 items-center justify-center'>
                <div className='text-body'>
                  <FaBookmark />
                </div>
                Dans la liste !
              </div>
            </button>
          ) : (
            <button
              onClick={() => handleAddToReadingList(book)}
              className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn active:bg-black-75 active:text-white-bg w-[121px]'
            >
              <div className='flex gap-1 items-center justify-center'>
                <div className='text-body'>
                  <FaRegBookmark />
                </div>
                Liste de lecture
              </div>
            </button>
          )}

          {/* Library Button */}
          {isInLibrary ? (
            <button
              onClick={() => handleRemoveFromLibrary(book.id)}
              className='cursor-pointer bg-secondary-btn text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[125px]'
            >
              <div className='flex gap-1 items-center justify-center'>
                <div className='text-body'>
                  <FaCheckCircle />
                </div>
                Dans la bibli !
              </div>
            </button>
          ) : (
            <button
              onClick={() => handleAddToLibrary(book)}
              className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[125px] active:bg-black-75 active:text-white-bg'
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
      </div>
    </>
  );
};

export default BookCard;
