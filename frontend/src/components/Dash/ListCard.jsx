import React from 'react';
import ListItem from './ListItem';
import { FaHeart } from 'react-icons/fa';

function ListCard({ variant, libraryBooks = [] }) {
  if (variant === 'recent') {
    const sortedBooks = [...libraryBooks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    return (
      <div className='h-[500px] bg-white-bg text-center text-chart-title p-4 overflow-hidden shadow-lg'>
        <div className='mb-8'>Ajoutés récemment</div>
        <div>
          {sortedBooks.map((book) => (
            <ListItem key={book.isbn} book={book} />
          ))}
        </div>
      </div>
    );
  } else if (variant === 'favorites') {
    const sortedBooks = [...libraryBooks]
      .filter((book) => book.isFavorite === true)
      .slice(0, 5);
    return (
      <div className='h-[500px] bg-white-bg text-chart-title p-4 overflow-hidden shadow-lg'>
        <div className='flex gap-2 mb-8 justify-self-center'>
          Coups de coeur{' '}
          <span className='text-primary-btn self-center'>
            <FaHeart />
          </span>
        </div>
        <div>
          {sortedBooks.map((book) => (
            <ListItem key={book.isbn} book={book} />
          ))}
        </div>
      </div>
    );
  }
}

export default ListCard;
