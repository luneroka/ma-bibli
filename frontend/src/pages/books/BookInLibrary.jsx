import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { removeFromLibrary } from '../../redux/features/library/librarySlice';

function BookInLibrary({ book }) {
  const dispatch = useDispatch();

  const handleRemoveFromLibrary = (book) => {
    dispatch(removeFromLibrary(book));
  };

  return (
    <>
      <div className='relative'>
        <Link to={`/livres/${book.id}`}>
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt='Book Cover'
            className='w-[121px] h-[170px] cursor-pointer hover:scale-105 transition-all duration-200 rounded-sm'
          />
        </Link>
        <button
          onClick={() => handleRemoveFromLibrary(book)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <TiDelete />
        </button>
      </div>
    </>
  );
}

export default BookInLibrary;
