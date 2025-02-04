import React from 'react';
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import bookCover from '../../assets/book-1.png';

const BookCard = ({ book }) => {
  return (
    <>
      <div className='flex gap-[24px]'>
        <div className='flex flex-col w-[114px] gap-[16px]'>
          <img src={bookCover} alt='Book Cover' className='h-[160px]' />
          <a
            href='/liste-de-lecture/ajouter'
            className='bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5'
          >
            <div className='flex gap-1 items-center justify-center'>
              <div className='text-body'>
                <FaRegBookmark />
              </div>
              Liste de lecture
            </div>
          </a>
        </div>

        <div className='flex flex-col w-[153px]'>
          <p className='text-small font-bold h-[28px] mb-[4px] overflow-hidden'>
            Book Title
          </p>
          <p className='text-small h-[128px] overflow-hidden mb-[16px]'>
            Book Description.Book Description.Book Description. Book
            Description. Book Description. Book Description. Book Description.
          </p>
          <a
            href='/bibliothèque/ajouter'
            className='bg-primary-btn text-black-75 text-xs rounded-lg px-1 py-1.5'
          >
            <div className='flex gap-1 items-center justify-center'>
              <div className='text-body'>
                <IoIosAddCircleOutline />
              </div>
              Ajouter à ma bibli
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default BookCard;
