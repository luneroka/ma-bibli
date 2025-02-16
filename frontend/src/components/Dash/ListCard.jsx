import React from 'react';
import ListItem from './ListItem';

function ListCard({ title }) {
  return (
    <div className='h-[500px] bg-white-bg text-center text-chart-title p-4 overflow-hidden shadow-lg'>
      {/* Card Title */}
      <div className='mb-8'>{title}</div>

      {/* List */}
      <div>
        {/* INSERT MAP */}
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
}

export default ListCard;
