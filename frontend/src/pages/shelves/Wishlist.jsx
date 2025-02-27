import React, { useEffect } from 'react';
import BookInWishlist from '../../components/Book/BookInWishlist';
import { getWishlistBooksAsync } from '../../redux/features/wishlist/wishlistAsyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

function Wishlist() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const token = await currentUser.getIdToken();
      dispatch(getWishlistBooksAsync({ token }));
    })();
  }, [dispatch, currentUser]);

  return (
    <div className='mx-[128px]'>
      <div className='items-center gap-8 mt-[48px] mb-[32px]'>
        <h3 className='text-h3 text-black-100 font-merriweather'>Wishlist</h3>
      </div>
      <div className='flex flex-wrap gap-4 mt-[32px]'>
        {wishlistBooks.length > 0 &&
          wishlistBooks.map((book, index) => {
            return (
              <BookInWishlist
                key={`${book.isbn}-${index}`}
                book={book}
                libraryBooks={libraryBooks}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Wishlist;
