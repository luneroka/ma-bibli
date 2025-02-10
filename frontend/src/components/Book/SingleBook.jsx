import React from 'react';
import { extractFullDate } from '../../utils/helpers';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  addToLibraryAsync,
  removeFromLibraryAsync,
} from '../../utils/libraryAsyncActions';
import {
  addToReadingListAsync,
  removeFromReadingListAsync,
} from '../../utils/readingListAsyncActions';

function SingleBook({ book, libraryBooks = [], readingListBooks = [] }) {
  const dispatch = useDispatch();

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

  // Convert HTML to plain text
  const plainTextDescription = book.volumeInfo.description
    ? book.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, '')
    : 'Pas de description...';

  return (
    <>
      <div>
        {/* Book Info */}
        <div className='flex gap-[24px]'>
          {/* Book Cover */}
          <div className='w-[220px] h-[330px] flex-shrink-0'>
            <img
              src={
                book.volumeInfo.imageLinks
                  ? Object.entries(book.volumeInfo.imageLinks)[0]?.[1]
                  : '../../../public/product-not-found.png'
              }
              alt={`Couverture non disponible`}
              className='w-full h-full'
            />
          </div>

          {/* Book Details */}
          <div className='flex flex-col place-content-between w-full overflow'>
            {/* Book Title */}
            <p className='text-h5 text-black'>{book.volumeInfo.title}</p>

            {/* Book Authors */}
            <p className='italic'>{book.volumeInfo.authors}</p>

            {/* Book Publisher */}
            <p className='text-small-body text-black'>
              Éditeur :{' '}
              <span className='text-black-85'>{book.volumeInfo.publisher}</span>
            </p>

            {/* Book Published Date */}
            <p className='text-small-body text-black'>
              Publication :{' '}
              <span className='text-black-85'>
                {extractFullDate(book.volumeInfo.publishedDate)}
              </span>
            </p>

            {/* Book Description */}
            <p className='h-[180px] max-w-[600px] text-small-body text-black-85 text-justify'>
              {plainTextDescription.length > 580
                ? `${plainTextDescription.slice(0, 580)}...`
                : plainTextDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex gap-[24px] mt-6'>
        {/* Reading List Button */}
        {isInReadingList ? (
          <button
            onClick={() => handleRemoveFromReadingList(book.id)}
            className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 hover:bg-secondary-btn w-[220px]'
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
            className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 hover:bg-secondary-btn active:bg-black-75 active:text-white-bg w-[220px]'
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
            className='cursor-pointer bg-secondary-btn text-black-75 text-small px-1 py-2.5 hover:bg-secondary-btn w-[220px]'
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
            className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-2.5 hover:bg-secondary-btn w-[220px] active:bg-black-75 active:text-white-bg'
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
    </>
  );
}

export default SingleBook;
