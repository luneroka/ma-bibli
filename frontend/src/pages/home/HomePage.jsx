import React, { useEffect } from 'react';
import NewReleases from './NewReleases';
import News from './News';
import { useSelector, useDispatch } from 'react-redux';
import { createSearchNewestAsync } from '../../redux/features/newest/newestAsyncActions';
import { createGetNewsAsync } from '../../redux/features/news/newsAsyncActions';
import { useAuth } from '../../context/AuthContext';
import { getWishlistBooksAsync } from '../../redux/features/wishlist/wishlistAsyncActions';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';
import { getFavoriteBooksAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { getApiPath } from '../../utils/apiConfig';

const HomePage = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const newest = useSelector((state) => state.newest.newest.items);
  const news = useSelector((state) => state.news.news);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  useEffect(() => {
    // Use getApiPath to get the appropriate URL for the environment
    dispatch(
      createSearchNewestAsync('newest', getApiPath('/api/search/newest'))()
    );
    dispatch(createGetNewsAsync('news', getApiPath('/api/news'))());

    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        dispatch(getLibraryBooksAsync({ token }));
        dispatch(getWishlistBooksAsync({ token }));
        dispatch(getFavoriteBooksAsync({ token }));
      });
    }
  }, [currentUser, dispatch]);

  return (
    <>
      <div
        key={currentUser?.uid || 'no-user'}
        className='px-[32px] sm:px-[64px] md:px-[128px]'
      >
        <div className='my-[32px] min-[1450px]:my-[80px]'>
          <NewReleases
            newest={newest}
            libraryBooks={libraryBooks}
            wishlistBooks={wishlistBooks}
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
