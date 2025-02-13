import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
import { removeFromLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import {
  getFavoriteBooksAsync,
  toggleFavoriteAsync,
} from '../../redux/features/favorites/favoritesAsyncActions';

function BookInLibrary({ book }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites) || [];
  const isFavorite = favorites?.some((fav) => fav.isbn === book.isbn);

  const handleRemoveFromLibrary = (isbn) => {
    dispatch(removeFromLibraryAsync(isbn));
  };

  const handleFavorite = (isbn) => {
    dispatch(toggleFavoriteAsync(isbn));
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
