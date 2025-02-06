import React, { useState } from 'react';
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToLibrary,
  removeFromLibrary,
} from '../../redux/features/library/librarySlice';

const BookCard = ({ book }) => {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const dispatch = useDispatch();

  const handleAddToLibrary = (book) => {
    dispatch(addToLibrary(book));
    setIsInLibrary(true);
  };

  const handleRemoveFromLibrary = (book) => {
    dispatch(removeFromLibrary(book));
    setIsInLibrary(false);
  };

  return (
    <>
      <div>
        <div className='flex gap-[24px]'>
          <div className='flex flex-col w-[121px] gap-[16px]'>
            <Link to={`/livres/${book._id}`}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt='Book Cover'
                className='h-[170px] cursor-pointer hover:scale-105 transition-all duration-200 rounded-sm'
              />
            </Link>
          </div>

          <div className='flex flex-col w-[200px]'>
            <Link to={`/livres/${book._id}`}>
              <p className='text-small text-black-75 hover:text-black font-bold h-[28px] mb-[14px] text-pretty leading-4.5'>
                {book.volumeInfo.title.length > 40
                  ? `${book.volumeInfo.title.slice(0, 40)}...`
                  : book.volumeInfo.title}
              </p>
            </Link>
            <p className='text-small text-black h-[128px] overflow-hidden mb-[16px]'>
              {book.volumeInfo.description.length > 145
                ? `${book.volumeInfo.description.slice(0, 145)}...`
                : book.volumeInfo.description}
            </p>
          </div>
        </div>
      </div>
      <div className='flex gap-[16px]'>
        <button className='bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5 hover:bg-secondary-btn w-[121px]'>
          <div className='flex gap-1 items-center justify-center'>
            <div className='text-body'>
              <FaRegBookmark />
            </div>
            Liste de lecture
          </div>
        </button>
        {isInLibrary ? (
          <button
            onClick={() => handleRemoveFromLibrary(book)}
            className='cursor-pointer bg-secondary-btn text-black-75 text-xs rounded-lg px-1 py-1.5 hover:bg-secondary-btn w-[125px]'
          >
            <div className='flex gap-1 items-center justify-center'>
              <div className='text-body'>
                <FaCheckCircle />
              </div>
              Ajouté!
            </div>
          </button>
        ) : (
          <button
            onClick={() => handleAddToLibrary(book)}
            className='cursor-pointer bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5 hover:bg-secondary-btn w-[125px]'
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
};

export default BookCard;
