import React from 'react';
import {
  getMostRepeatedValue,
  getMostRepeatedAuthor,
} from '../../utils/helper';

function MetricCard({ variant, libraryBooks = [] }) {
  const haveReadBooks = [...libraryBooks].filter(
    (book) => book.haveRead === true
  );

  if (variant === 'books') {
    return (
      <div className='h-[120px] pl-[64px] bg-white-bg flex justify-between items-center shadow-lg'>
        <div>
          <p className='text-metrics-number text-secondary-btn'>
            {haveReadBooks.length}{' '}
            <span className='text-black-50 text-body'>
              /{libraryBooks.length}{' '}
            </span>
          </p>
          <p className='text-metrics-type font-light'>Livres lus</p>
        </div>
      </div>
    );
  } else if (variant === 'pageCount') {
    const totalPages =
      libraryBooks.length === 0
        ? 0
        : libraryBooks.reduce((total, book) => total + book.pageCount, 0);

    const totalReadPages =
      haveReadBooks.length === 0
        ? 0
        : haveReadBooks.reduce((total, book) => total + book.pageCount, 0);

    return (
      <div className='h-[120px] pl-[64px] bg-white-bg flex flex-col justify-center shadow-lg'>
        <p className='text-metrics-number text-secondary-btn'>
          {totalReadPages.toLocaleString('fr-FR')}{' '}
          <span className='text-black-50 text-body'>
            /{totalPages.toLocaleString('fr-FR')}
          </span>
        </p>
        <p className='text-metrics-type font-light'>Pages lues</p>
      </div>
    );
  } else if (variant === 'topGenre') {
    return (
      <div className='h-[120px] pl-[64px] bg-white-bg flex flex-col justify-center shadow-lg'>
        <p className='text-metrics-number text-secondary-btn'>
          {getMostRepeatedValue(libraryBooks, 'category')}
        </p>
        <p className='text-metrics-type font-light'>Top Genre</p>
      </div>
    );
  } else if (variant === 'topAuthor') {
    return (
      <div className='h-[120px] pl-[64px] bg-white-bg flex flex-col justify-center shadow-lg'>
        <p className='text-metrics-number text-secondary-btn'>
          {getMostRepeatedAuthor(libraryBooks)}
        </p>
        <p className='text-metrics-type font-light'>Top Auteur</p>
      </div>
    );
  }
}

export default MetricCard;
