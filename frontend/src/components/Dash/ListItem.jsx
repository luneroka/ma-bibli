import React from 'react';

function ListItem({ book }) {
  return (
    <div className='text-start flex flex-col m-0'>
      <div className='pl-2 text-black text-small-body font-light'>
        {book.title}
      </div>
      <div className='pl-2 text-black-50 text-small font-light'>
        {book.authors}
      </div>
      <hr className='text-secondary-btn my-3 opacity-50' />
    </div>
  );
}

export default ListItem;
