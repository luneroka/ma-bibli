import React from 'react';
import MetricCard from '../../components/Dash/MetricCard';
import GraphCard from '../../components/Dash/GraphCard';
import ListCard from '../../components/Dash/ListCard';
import { useSelector } from 'react-redux';

function DashBody() {
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];

  return (
    <div className='mx-[128px] grid grid-cols-4 gap-[32px]'>
      {/* Metrics Cards */}
      <MetricCard variant='books' libraryBooks={libraryBooks} />
      <MetricCard variant='pageCount' libraryBooks={libraryBooks} />
      <MetricCard variant='topGenre' libraryBooks={libraryBooks} />
      <MetricCard variant='topAuthor' libraryBooks={libraryBooks} />

      {/* Graph Card */}
      <div className='col-span-2'>
        <GraphCard />
      </div>

      {/* List Card */}
      <ListCard title='Ajoutés récemment' />
      <ListCard title='Coups de coeur' />
    </div>
  );
}

export default DashBody;
