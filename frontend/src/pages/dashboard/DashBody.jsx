import React from 'react';
import MetricCard from '../../components/Dash/MetricCard';
import GraphCard from '../../components/Dash/GraphCard';
import ListCard from '../../components/Dash/ListCard';
import { useSelector } from 'react-redux';

function DashBody({ activeFilter }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];

  const filteredBooks = (() => {
    if (activeFilter === '7 jours') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(sevenDaysAgo.getHours() - 12);
      // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      console.log(sevenDaysAgo);
      return libraryBooks.filter(
        (book) => new Date(book.createdAt) >= sevenDaysAgo
      );
    }

    if (activeFilter === '30 jours') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setHours(thirtyDaysAgo.getHours() - 16);
      // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return libraryBooks.filter(
        (book) => new Date(book.createdAt) >= thirtyDaysAgo
      );
    }

    return libraryBooks;
  })();

  return (
    <div className='mx-[64px] md:mx-[128px] grid grid-cols-1 min-[700px]:grid-cols-2 lg:grid-cols-4 gap-[32px]'>
      {/* Metrics Cards */}
      <MetricCard variant='books' libraryBooks={filteredBooks} />
      <MetricCard variant='pageCount' libraryBooks={filteredBooks} />
      <MetricCard variant='topGenre' libraryBooks={filteredBooks} />
      <MetricCard variant='topAuthor' libraryBooks={filteredBooks} />

      {/* Graph Card */}
      <div className='col-span-1 min-[700px]:col-span-2 lg:col-span-2'>
        <GraphCard libraryBooks={filteredBooks} />
      </div>

      {/* List Card */}
      <ListCard variant='recent' libraryBooks={filteredBooks} />
      <ListCard variant='favorites' libraryBooks={filteredBooks} />
    </div>
  );
}

export default DashBody;
