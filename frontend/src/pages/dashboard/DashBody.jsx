import MetricCard from '../../components/Dash/MetricCard';
import GraphCard from '../../components/Dash/GraphCard';
import ListCard from '../../components/Dash/ListCard';
import { useSelector } from 'react-redux';
import PrograssBars from '../../components/Dash/PrograssBars';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DashBody({ activeFilter, readingObjective }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];
  const haveReadBooks = [...libraryBooks].filter(
    (book) => book.haveRead === true
  );

  const filteredBooks = (() => {
    if (activeFilter === '7 jours') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return libraryBooks.filter(
        (book) => new Date(book.createdAt) >= sevenDaysAgo
      );
    }

    if (activeFilter === '30 jours') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return libraryBooks.filter(
        (book) => new Date(book.createdAt) >= thirtyDaysAgo
      );
    }

    return libraryBooks;
  })();

  // Progression bars data
  const countProgress =
    libraryBooks.length > 0
      ? Math.round((haveReadBooks.length / libraryBooks.length) * 100)
      : 0;

  const filteredHaveReadBooks = readingObjective.timeframe
    ? haveReadBooks.filter(
        (book) =>
          new Date(book.dateHaveRead) >= new Date(readingObjective.timeframe)
      )
    : haveReadBooks;

  const hasObjective =
    readingObjective &&
    typeof readingObjective.objective === 'number' &&
    readingObjective.objective > 0 &&
    readingObjective.timeframe;

  const userProgress = hasObjective
    ? Math.round(
        (filteredHaveReadBooks.length / readingObjective.objective) * 100
      )
    : 0;

  return (
    <div className='mx-[32px] sm:mx-[64px] lg:mx-[128px] grid grid-cols-1 min-[700px]:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[32px]'>
      {/* Progression Bars */}
      <div className='col-span-1 min-[700px]:col-span-2'>
        <p className='text-xs min-[700px]:text-small font-light text-black-75'>
          LIVRES LUS / LIVRES POSSÉDÉS
        </p>
        <PrograssBars
          className='h-[16px] flex items-center'
          progress={countProgress}
        />
      </div>
      <div className='col-span-1 min-[700px]:col-span-2'>
        {hasObjective ? (
          <>
            <p className='text-xs min-[700px]:text-small font-light text-black-75'>
              OBJECTIF ANNUEL : {readingObjective.objective} livres du{' '}
              {new Date(readingObjective.timeframe).toLocaleDateString('fr-FR')}{' '}
              au 31/12/{new Date().getFullYear()}
              <span className='ml-2 text-primary-btn hover:text-secondary-btn active:text-black-75 text-xs'>
                <Link to='/mon-compte'>modifier l&apos;objectif</Link>
              </span>
            </p>
            <PrograssBars
              className='h-[16px] flex items-center'
              progress={userProgress}
            />
          </>
        ) : (
          <>
            <p className='text-small font-light text-black-75'>
              OBJECTIF ANNUEL : Aucun objectif défini
              <span className='ml-2 text-primary-btn hover:text-secondary-btn active:text-black-75 text-xs'>
                <Link to='/mon-compte'>définir un objectif</Link>
              </span>
            </p>
            <PrograssBars className='h-[16px] flex items-center' progress={0} />
          </>
        )}
      </div>

      {/* Metrics Cards and other components */}
      <div className='col-span-1 min-[700px]:col-span-2 lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <MetricCard variant='books' libraryBooks={filteredBooks} />
        <MetricCard variant='pageCount' libraryBooks={filteredBooks} />
        <MetricCard variant='topGenre' libraryBooks={filteredBooks} />
        <MetricCard variant='topAuthor' libraryBooks={filteredBooks} />
      </div>

      <div className='min-[700px]:col-span-2'>
        <GraphCard libraryBooks={filteredBooks} />
      </div>

      <ListCard variant='recent' libraryBooks={filteredBooks} />
      <ListCard variant='favorites' libraryBooks={filteredBooks} />
    </div>
  );
}

DashBody.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  readingObjective: PropTypes.shape({
    objective: PropTypes.number,
    timeframe: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
};

export default DashBody;
