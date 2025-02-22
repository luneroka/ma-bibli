import React from 'react';
import MetricCard from '../../components/Dash/MetricCard';
import GraphCard from '../../components/Dash/GraphCard';
import ListCard from '../../components/Dash/ListCard';
import { useSelector } from 'react-redux';
import PrograssBars from '../../components/Dash/PrograssBars';
import { Link } from 'react-router-dom';

function DashBody({ activeFilter }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];
  const haveReadBooks = [...libraryBooks].filter(
    (book) => book.haveRead === true
  );

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

  // Progression bars data
  const countProgress = Math.round(
    (haveReadBooks.length / libraryBooks.length) * 100
  );

  const userProgress = '';

  return (
    <div className='mx-[64px] md:mx-[128px] grid grid-cols-1 min-[700px]:grid-cols-2 lg:grid-cols-4 gap-[24px]'>
      {/* Metrics Cards */}
      <MetricCard variant='books' libraryBooks={filteredBooks} />
      <MetricCard variant='pageCount' libraryBooks={filteredBooks} />
      <MetricCard variant='topGenre' libraryBooks={filteredBooks} />
      <MetricCard variant='topAuthor' libraryBooks={filteredBooks} />

      {/* Progression Bars */}
      <div className='col-span-2 '>
        <p className='text-small text-black-75'>
          % livres lus vs livres possédés
        </p>
        <PrograssBars
          className='h-[16px] flex items-center'
          progress={countProgress}
        />
      </div>
      <div className='col-span-2'>
        <p className='text-small text-black-75'>
          % livres lus vs objectif annuel (
          <span className='text-primary-btn underline hover:seconday-primary-btn active:text-black-75'>
            <Link to='/mon-compte'>définir un objectif</Link>
          </span>
          )
        </p>
        <PrograssBars
          className='h-[16px] flex items-center'
          progress={userProgress}
        />
      </div>

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
