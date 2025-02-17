import React, { useEffect } from 'react';
import BookInReadingList from '../../components/Book/BookInReadingList';
import { getReadingListBooksAsync } from '../../redux/features/reading-list/readingListAsyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

function ReadingList() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const readingListBooks = useSelector(
    (state) => state.readingList.readingListBooks
  );

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const token = await currentUser.getIdToken();
      dispatch(getReadingListBooksAsync({ token }));
    })();
  }, [dispatch, currentUser]);

  return (
    <>
      <div className='items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>
          Ma Liste de lecture
        </h3>
      </div>
      <div className='flex flex-wrap gap-4 mt-[32px]'>
        {readingListBooks.length > 0 &&
          readingListBooks.map((book) => {
            return (
              <BookInReadingList
                key={book.isbn}
                book={book}
                libraryBooks={libraryBooks}
              />
            );
          })}
      </div>
    </>
  );
}

export default ReadingList;
