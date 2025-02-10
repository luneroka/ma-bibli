import React from 'react';
import NewReleases from './NewReleases';
import Recommended from './Recommended';
import MostPopulars from './MostPopulars';
import News from './News';
import { useSelector } from 'react-redux';

const Home = () => {
  const books = useSelector((state) => state.books.books);
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  return (
    <>
      <div className='px-[128px]'>
        <div className='mt-[96px] mb-[96px]'>
          <NewReleases
            books={books}
            libraryBooks={libraryBooks}
            readingListBooks={readingListBooks}
          />
        </div>

        <div className='mb-[96px]'>
          <MostPopulars
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
