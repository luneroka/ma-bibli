import React, { useEffect } from 'react';
import BookInWishlist from '../../components/Book/BookInWishlist';
import { getWishlistBooksAsync } from '../../redux/features/wishlist/wishlistAsyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { getApiPath } from '../../utils/apiConfig';

function Wishlist() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const token = await currentUser.getIdToken();
      // Pass the apiPath to the async action
      dispatch(
        getWishlistBooksAsync({
          token,
          apiPath: getApiPath('/api/wishlist'),
        })
      );
    })();
  }, [dispatch, currentUser]);

  return (
    <div className='mx-[32px] sm:mx-[64px] lg:mx-[128px]'>
      <div className='items-center gap-8 mt-[32px] md:mt-[48px] mb-5'>
        <h3 className='text-h4 xs:text-h3 min-[1450px]:text-h2 text-black-100 font-merriweather'>
          Wishlist
        </h3>
      </div>
      <div className='flex flex-wrap gap-4 mt-[16px] xs:mt-[32px]'>
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
