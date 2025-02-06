import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { removeFromReadingList } from '../../redux/features/reading-list/readingListSlice';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { addToLibrary } from '../../redux/features/library/librarySlice';

function BookInReadingList({ book }) {
  const dispatch = useDispatch();

  const handleRemoveFromReadingList = (book) => {
    dispatch(removeFromReadingList(book));
  };

  const handleMoveToLibrary = (book) => {
    dispatch(addToLibrary(book));
    dispatch(removeFromReadingList(book));
  };

  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='relative gap-1'>
          <Link to={`/livres/${book.id}`}>
            <img
              src={book.thumbnail}
              alt='Book Cover'
              className='w-[125px] h-[175px] cursor-pointer hover:scale-105 transition-all duration-200 rounded-sm'
            />
          </Link>
          <button
            onClick={() => handleRemoveFromReadingList(book)}
            className='absolute top-1 right-1 rounded-full shadow-md hover:text-primary-btn text-black-75 bg-white-bg  cursor-pointer hover:scale-150 transition-all duration-200'
          >
            <TiDelete />
          </button>
        </div>
        <button
          onClick={() => handleMoveToLibrary(book)}
          className='cursor-pointer bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5 hover:bg-secondary-btn w-[125px] active:bg-black-75 active:text-white-bg'
        >
          <div className='flex gap-1 items-center justify-center'>
            <div className='text-body'>
              <IoIosAddCircleOutline />
            </div>
            Ajouter à ma bibli
          </div>
        </button>
      </div>
    </>
  );
}

export default BookInReadingList;
