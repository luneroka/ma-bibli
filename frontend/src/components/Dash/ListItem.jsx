import React from 'react';

function ListItem() {
  return (
    <div className='text-start flex flex-col m-0'>
      <div className='pl-2 text-black text-small-body font-light'>
        Book Title
      </div>
      <div className='pl-2 text-black-50 text-small font-light'>Authors</div>
      <hr className='text-secondary-btn my-3 opacity-50' />
    </div>
  );
}

export default ListItem;
