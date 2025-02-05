import React from 'react';
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
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
    </>
  );
};

export default BookCard;
