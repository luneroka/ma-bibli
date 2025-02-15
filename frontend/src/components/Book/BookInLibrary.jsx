import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
import { removeFromLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { useAuth } from '../../context/AuthContext';

function BookInLibrary({ book }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const isFavorite = book.isFavorite;

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
      <div className='relative'>
        <Link to={`/livres/${book.isbn}`}>
          <img
            src={book.cover}
            alt='Book Cover'
            className='w-[125px] h-[175px] object-contains cursor-pointer hover:scale-105 transition-all duration-200'
          />
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => handleFavorite(book.isbn)}
          className={`absolute top-1 left-1 rounded-full shadow-md bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200 ${
            isFavorite ? 'text-primary-btn' : 'text-black-75'
          }`}
        >
          <FaHeart className={`p-0.5`} />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleRemoveFromLibrary(book.isbn)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <IoIosRemoveCircle className='p-0.25' />
        </button>
      </div>
    </>
  );
}

export default BookInLibrary;
