import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import { removeFromLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { useAuth } from '../../context/AuthContext';

function BookInLibrary({ book }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const isFavorite = book.isFavorite;

  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <>
      <div className='flex w-[125px] h-[175px] relative flex-shrink-0 items-center justify-center'>
        {/* Spinner while image is loading */}
        {!imageLoaded && (
          <FaSpinner className='animate-spin text-xl text-black-50 absolute inset-0 m-auto' />
        )}
        <Link to={`/livres/${book.isbn}`}>
          <img
            src={book.cover}
            alt='Book Cover'
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ${
              !imageLoaded ? 'hidden' : ''
            }`}
            style={{ width: '125px', height: '175px' }}
          />
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => handleFavorite(book.isbn)}
          className={`absolute top-1 left-1 rounded-full shadow-md bg-white-bg cursor-pointer hover:scale-150 transition-all duration-200 ${
            isFavorite ? 'text-primary-btn' : 'text-black-75'
          }`}
        >
          <FaHeart className='p-0.5' />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleRemoveFromLibrary(book.isbn)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <IoIosRemoveCircle className='p-0.25' />
        </button>
      </div>
    </>
  );
}

export default BookInLibrary;
