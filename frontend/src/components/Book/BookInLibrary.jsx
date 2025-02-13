import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircle } from 'react-icons/io';
import { FaHeart } from 'react-icons/fa';
import { removeFromLibraryAsync } from '../../redux/features/library/libraryAsyncActions';

function BookInLibrary({ book }) {
  const dispatch = useDispatch();
  const handleRemoveFromLibrary = (isbn) => {
    dispatch(removeFromLibraryAsync(isbn));
  };

  const onFavorite = () => {
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
          onClick={() => onFavorite(book.isbn)}
          className='absolute top-1 left-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <FaHeart className={`p-0.5 favorite-btn`} />
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
