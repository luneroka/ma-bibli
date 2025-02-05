import React from 'react';
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <>
      <div className='flex gap-[24px]'>
        <div className='flex flex-col w-[114px] gap-[16px]'>
          <Link to={`/livres/${book._id}`}>
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt='Book Cover'
              className='h-[160px] cursor-pointer hover:scale-105 transition-all duration-200 rounded-sm'
            />
          </Link>
          <Link
            to='/'
            className='bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5 hover:bg-secondary-btn'
          >
            <div className='flex gap-1 items-center justify-center'>
              <div className='text-body'>
                <FaRegBookmark />
              </div>
              Liste de lecture
            </div>
          </Link>
        </div>

        <div className='flex flex-col w-[153px]'>
          <Link to={`/livres/${book._id}`}>
            <p className='text-small font-bold h-[28px] mb-[4px] overflow-hidden'>
              {book.volumeInfo.title.length > 22
                ? `${book.volumeInfo.title.slice(0, 22)}...`
                : book.volumeInfo.title}
            </p>
          </Link>
          <p className='text-small h-[128px] overflow-hidden mb-[16px]'>
            {book.volumeInfo.description.length > 115
              ? `${book.volumeInfo.description.slice(0, 115)}...`
              : book.volumeInfo.description}
          </p>
          <Link
            to='/'
            className='bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5 hover:bg-secondary-btn'
          >
            <div className='flex gap-1 items-center justify-center'>
              <div className='text-body'>
                <IoIosAddCircleOutline />
              </div>
              Ajouter à ma bibli
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;
