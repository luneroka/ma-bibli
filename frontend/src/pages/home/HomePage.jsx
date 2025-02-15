import React, { useEffect } from 'react';
import NewReleases from './NewReleases';
import News from './News';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchNewestAsync } from '../../redux/features/newest/newestAsyncActions';
import { createGetNewsAsync } from '../../redux/features/news/newsAsyncActions';
import { useAuth } from '../../context/AuthContext';
import { getReadingListBooksAsync } from '../../redux/features/reading-list/readingListAsyncActions';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';
import { getFavoriteBooksAsync } from '../../redux/features/favorites/favoritesAsyncActions';

const HomePage = () => {
  const { currentUser } = useAuth();
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
    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        dispatch(getLibraryBooksAsync({ token }));
        dispatch(getReadingListBooksAsync({ token }));
        dispatch(getFavoriteBooksAsync({ token }));
      });
    }
  }, [currentUser, dispatch]);

  return (
    <>
      <div key={currentUser?.uid || 'no-user'} className='px-[128px]'>
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
