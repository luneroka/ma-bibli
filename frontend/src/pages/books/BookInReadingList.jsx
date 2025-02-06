import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { removeFromReadingList } from '../../redux/features/reading-list/readingListSlice';

function BookInReadingList({ book }) {
  const dispatch = useDispatch();

  const handleRemoveFromReadingList = (book) => {
    dispatch(removeFromReadingList(book));
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
          onClick={() => handleRemoveFromReadingList(book)}
          className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200'
        >
          <TiDelete />
        </button>
      </div>
    </>
  );
}

export default BookInReadingList;
