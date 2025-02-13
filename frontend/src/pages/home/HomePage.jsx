import React, { useEffect } from 'react';
import NewReleases from './NewReleases';
import News from './News';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchNewestAsync } from '../../utils/asyncActions';
import { createGetNewsAsync } from '../../redux/features/news/newsAsyncActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const newest = useSelector((state) => state.newest.newest.items);
  const news = useSelector((state) => state.news.news);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  useEffect(() => {
    dispatch(createSearchNewestAsync('newest', '/api/search/newest')());
    dispatch(createGetNewsAsync('news', '/api/news')());
  }, [dispatch]);

  return (
    <>
      <div className='px-[128px]'>
        <div className='my-[80px]'>
          <NewReleases
            newest={newest}
            libraryBooks={libraryBooks}
            readingListBooks={readingListBooks}
          />
        </div>

        <div className=''>
          <News news={news} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
