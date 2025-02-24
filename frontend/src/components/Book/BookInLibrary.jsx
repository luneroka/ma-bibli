import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';
import { FaHeart, FaSpinner, FaArrowCircleRight } from 'react-icons/fa';
import { removeFromLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { toggleHaveReadAsync } from '../../redux/features/have-read/haveReadAsyncActions';
import { toggleHaveReadOptimistic } from '../../redux/features/library/librarySlice';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';
import { useAuth } from '../../context/AuthContext';

function BookInLibrary({ book }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const isFavorite = book.isFavorite;
  const haveRead = book.haveRead;

  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleRemoveFromLibrary = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(removeFromLibraryAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for library add:', error);
    }
  };

  const handleFavorite = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(toggleFavoriteAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for favorite toggle:', error);
    }
  };

  const handleHaveRead = async (isbn) => {
    if (!currentUser) return;
    // Optimistically update libraryBooks in the library slice:
    dispatch(toggleHaveReadOptimistic({ isbn }));
    try {
      const token = await currentUser.getIdToken();
      // Dispatch async call to toggle on the backend
      await dispatch(toggleHaveReadAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for have read toggle:', error);
      // Optionally revert the optimistic update if needed.
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-[125px] h-[175px] relative flex-shrink-0 items-center justify-center'>
        {/* Spinner while image is loading */}
        {!imageLoaded && (
          <FaSpinner className='animate-spin text-xl text-black-50 absolute inset-0 m-auto' />
        )}
        <Link to={`/livres/${book.isbn}`}>
          <img
            src={getCoverUrl(book.cover)}
            alt='Book Cover'
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ${
              !imageLoaded ? 'hidden' : ''
            }`}
            style={{ width: '125px', height: '175px' }}
          />
        </Link>

        {/* Favorite Button */}
        {haveRead && (
          <button
            onClick={() => handleFavorite(book.isbn)}
            className={`absolute top-1 left-1 rounded-full shadow-md bg-white-bg cursor-pointer hover:scale-150 transition-all duration-200 ${
              isFavorite ? 'text-primary-btn' : 'text-black-75'
            }`}
          >
            <FaHeart className='p-0.5' />
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => handleRemoveFromLibrary(book.isbn)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <IoIosRemoveCircle className='p-0.25' />
        </button>
      </div>

      {/* Have Read Button */}
      {!haveRead && (
        <button
          onClick={() => handleHaveRead(book.isbn)}
          className='cursor-pointer bg-primary-btn text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn w-[125px] active:bg-black-75 active:text-white-bg'
        >
          <div className='flex gap-1 items-center justify-center text-small'>
            J'ai lu !
            <FaArrowCircleRight className='text-body' />
          </div>
        </button>
      )}

      {/* Update btn */}
      <Link to={`/livres/${book.isbn}/edit`} state={{ book }}>
        <button className='cursor-pointer w-[125px] bg-gray-200 text-black text-xs px-1 py-1.5 hover:bg-gray-300'>
          Modifier
        </button>
      </Link>
    </div>
  );
}

export default BookInLibrary;
