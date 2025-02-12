import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { removeFromLibraryAsync } from '../../utils/libraryAsyncActions';

function BookInLibrary({ book }) {
  const dispatch = useDispatch();

  const handleRemoveFromLibrary = (isbn) => {
    dispatch(removeFromLibraryAsync(isbn));
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
        <button
          onClick={() => handleRemoveFromLibrary(book.isbn)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <TiDelete />
        </button>
      </div>
    </>
  );
}

export default BookInLibrary;
