import React from 'react';
import { useSelector } from 'react-redux';
import SingleGoogleBook from '../../components/SingleBook/SingleGoogleBook';

function SingleBookFromGoogle({ book }) {
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  return (
    <SingleGoogleBook
      book={book}
      wishlistBooks={wishlistBooks}
      isInLibrary={false}
    />
  );
}

export default SingleBookFromGoogle;
