import React from 'react';
import { extractYear } from '../../utils/helpers';
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';

function SingleBook({ book }) {
  return (
    <>
      <div>
        <div className='flex gap-[24px]'>
          <img
            src={
              book.volumeInfo.imageLinks.small
                ? book.volumeInfo.imageLinks.small
                : '../../../public/product-not-found.png'
            }
            alt={`${book.volumeInfo.title}'s book cover`}
            className='w-[235px] h-[330px]'
          />
          <div className='flex flex-col place-content-between w-full py-2'>
            <p className='text-h5 text-black'>{book.volumeInfo.title}</p>
            <p className='italic'>{book.volumeInfo.authors}</p>
            <p className='text-small-body text-black'>
              Éditeur :{' '}
              <span className='text-black-85'>{book.volumeInfo.publisher}</span>
            </p>
            <p className='text-small-body text-black'>
              Publication :{' '}
              <span className='text-black-85'>
                {extractYear(book.volumeInfo.publishedDate)}
              </span>
            </p>
            <p className='h-[180px] max-w-[600px] text-small-body text-black-85 text-justify'>
              <span className='text-black'>Description : </span>
              {book.volumeInfo.description
                ? book.volumeInfo.description.length > 655
                  ? `${book.volumeInfo.description.slice(0, 655)}...`
                  : `${book.volumeInfo.description}`
                : 'Pas de description...'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex gap-[24px] mt-6'>
        <button className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-3 hover:bg-secondary-btn active:bg-black-75 active:text-white-bg w-[235px]'>
          <div className='flex gap-1 items-center justify-center'>
            <div className='text-body'>
              <FaRegBookmark />
            </div>
            Liste de lecture
          </div>
        </button>
        <button className='cursor-pointer bg-primary-btn text-black-75 text-small px-1 py-3 hover:bg-secondary-btn w-[235px] active:bg-black-75 active:text-white-bg'>
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

export default SingleBook;
