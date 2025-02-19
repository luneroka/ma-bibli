import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { removeFromReadingListAsync } from '../../redux/features/reading-list/readingListAsyncActions';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { addToLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import { useAuth } from '../../context/AuthContext';

function BookInReadingList({ book, libraryBooks = [] }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemoveFromReadingList = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(removeFromReadingListAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for reading list add:', error);
    }
  };

  const handleMoveToLibrary = async (book) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(addToLibraryAsync({ token, optimisticBook: book }));
      dispatch(removeFromReadingListAsync({ token, isbn: book.isbn }));
    } catch (error) {
      console.error('Error fetching token for moving to library:', error);
    }
  };

  const isInLibrary = libraryBooks.some(
    (libraryBook) => libraryBook.isbn === book.isbn
  );

  return (
    <>
      <div className='flex flex-col gap-2'>
        {/* Book Info */}
        <div className='relative gap-1'>
          {/* Book Cover */}
          <Link to={`/livres/${book.isbn}`}>
            <div className='relative w-[125px] h-[175px] flex items-center justify-center'>
              {!imageLoaded && (
                <FaSpinner className='animate-spin text-xl text-black-50 absolute inset-0 m-auto' />
              )}
              <img
                src={book.cover}
                alt='Book Cover'
                onLoad={() => setImageLoaded(true)}
                className={`w-[125px] h-[175px] object-contain cursor-pointer hover:scale-105 transition-all duration-200 ${
                  !imageLoaded ? 'hidden' : ''
                }`}
              />
            </div>
          </Link>

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveFromReadingList(book.isbn)}
            className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg cursor-pointer hover:scale-150 transition-all duration-200'
          >
            <TiDelete />
          </button>
        </div>

        {/* Library Button */}
        {isInLibrary ? (
          <button className='bg-secondary-btn text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[125px]'>
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
    </>
  );
}

export default BookInReadingList;
