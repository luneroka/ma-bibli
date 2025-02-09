import React from 'react';
import { extractYear } from '../../utils/helpers';
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

  return (
    <>
      <div>
        <div className='flex gap-[24px]'>
          <div className='w-[220px] h-[330px] flex-shrink-0'>
            <img
              src={
                book.volumeInfo.imageLinks.small
                  ? book.volumeInfo.imageLinks.small
                  : '../../../public/product-not-found.png'
              }
              alt={`${book.volumeInfo.title}'s book cover`}
              className='w-full h-full object-contains'
            />
          </div>
          <div className='flex flex-col place-content-between w-full py-2'>
            <p className='text-h5 text-black'>{book.volumeInfo.title}</p>
            <p className='italic'>{book.volumeInfo.authors}</p>
            <p className='text-small-body text-black'>
              Éditeur :{' '}
              <span className='text-black-85'>{book.volumeInfo.publisher}</span>
            </p>
            <p className='text-small-body text-black'>
              Publication :{' '}
              <span className='text-black-85'>
                {extractYear(book.volumeInfo.publishedDate)}
              </span>
            </p>
            <p className='h-[180px] max-w-[600px] text-small-body text-black-85 text-justify'>
              <span className='text-black'>Description : </span>
              {book.volumeInfo.description
                ? book.volumeInfo.description.length > 655
                  ? `${book.volumeInfo.description.slice(0, 655)}...`
                  : `${book.volumeInfo.description}`
                : 'Pas de description...'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex gap-[24px] mt-6'>
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
