import React from 'react';
import { extractYear } from '../../utils/helpers';

function SingleBook({ book }) {
  return (
    <>
      <div>
        <div className='flex gap-[24px] max-h-[360px]'>
          <div className='flex flex-col gap-[16px]'>
            <img
              src={
                book.volumeInfo.imageLinks.small
                  ? book.volumeInfo.imageLinks.small
                  : '../../../public/product-not-found.png'
              }
              alt={`${book.volumeInfo.title}'s book cover`}
              className=''
            />
          </div>
          <div className='flex flex-col place-content-between w-full py-2'>
            <p className='text-h5 text-black'>{book.volumeInfo.title}</p>
            <p className='italic'>{book.volumeInfo.authors}</p>
            <p className='text-small-body text-black-85'>Éditeur : {book.volumeInfo.publisher}</p>
            <p className='text-small-body text-black-85'>Publication : {extractYear(book.volumeInfo.publishedDate)}</p>
            <p className='h-[180px] max-w-[600px] text-small-body text-black-75 text-justify'>
              <span className='text-black-85'>Description : </span>{book.volumeInfo.description
                ? book.volumeInfo.description.length > 735
                  ? `${book.volumeInfo.description.slice(0, 735)}...`
                  : `${book.volumeInfo.description}`
                : 'Pas de description...'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBook;
