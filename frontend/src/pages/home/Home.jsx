import React, { useEffect } from 'react';
import NewReleases from './NewReleases';
import Recommended from './Recommended';
import BestSellers from './BestSellers';
import News from './News';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchNewestAsync } from '../../utils/asyncActions';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const newest = useSelector((state) => state.newest.newest.items);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  useEffect(() => {
    dispatch(createSearchNewestAsync('newest', '/api/search/newest')());
  }, [dispatch]);

  return (
    <>
      <div className='px-[128px]'>
        <div className='mt-[96px] mb-[96px]'>
          <NewReleases
            newest={newest}
            libraryBooks={libraryBooks}
            readingListBooks={readingListBooks}
          />
        </div>

        <div className='mb-[96px]'>
          <BestSellers
            books={books}
            libraryBooks={libraryBooks}
            readingListBooks={readingListBooks}
          />
        </div>

        <div className='mb-[96px]'>
          <Recommended
            books={books}
            libraryBooks={libraryBooks}
            readingListBooks={readingListBooks}
          />
        </div>

        <div className='mb-[128px]'>
          <News />
        </div>
      </div>
    </>
  );
};

export default Home;
