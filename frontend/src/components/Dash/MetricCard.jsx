import React from 'react';
import { getMostRepeatedValue } from '../../utils/helper';

function MetricCard({ variant, libraryBooks = [] }) {
  if (variant === 'books') {
    return (
      <div className='h-[120px] pl-[64px] bg-white-bg flex flex-col justify-center shadow-lg'>
        <p className='text-metrics-number text-secondary-btn'>
          {libraryBooks.length}
        </p>
        <p className='text-metrics-type font-light'>Livres</p>
      </div>
    );
  } else if (variant === 'pageCount') {
    const totalPages =
      libraryBooks.length === 0
        ? 0
        : libraryBooks.reduce((total, book) => total + book.pageCount, 0);

    return (
      <div className='h-[120px] pl-[64px] bg-white-bg flex flex-col justify-center shadow-lg'>
        <p className='text-metrics-number text-secondary-btn'>
          {totalPages.toLocaleString('fr-FR')}
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
          {getMostRepeatedValue(libraryBooks, 'authors'[0])}
        </p>
        <p className='text-metrics-type font-light'>Top Auteur/Autrice</p>
      </div>
    );
  }
}

export default MetricCard;
