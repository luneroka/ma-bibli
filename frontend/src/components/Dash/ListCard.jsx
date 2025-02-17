import React from 'react';
import ListItem from './ListItem';

function ListCard({ variant, title, libraryBooks = [] }) {
  if (variant === 'recent') {
    const sortedBooks = [...libraryBooks]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    return (
      <div className='h-[500px] bg-white-bg text-center text-chart-title p-4 overflow-hidden shadow-lg'>
        <div className='mb-8'>{title}</div>
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
      <div className='h-[500px] bg-white-bg text-center text-chart-title p-4 overflow-hidden shadow-lg'>
        <div className='mb-8'>{title}</div>
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
