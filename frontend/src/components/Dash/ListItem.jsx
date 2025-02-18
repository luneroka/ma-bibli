import React from 'react';
import { Link } from 'react-router-dom';

function ListItem({ book }) {
  const authorsFormatted = book.authors.slice(0, 2).join(', ');

  return (
    <div className='text-start flex flex-col m-0'>
      <div className='pl-2 text-black text-small-body font-light'>
        <Link to={`/livres/${book.isbn}`}>
          {book.title.length > 42
            ? `${book.title.slice(0, 42)}...`
            : book.title}
        </Link>
      </div>
      <div className='flex pl-2 text-black-50 text-small font-light'>
        {authorsFormatted.length > 40
          ? `${authorsFormatted.slice(0, 40)}...`
          : authorsFormatted}
      </div>
      <hr className='text-secondary-btn my-3 opacity-50' />
    </div>
  );
}

export default ListItem;

`Harry Potter et l'Enfant maudit - Parties un `;
