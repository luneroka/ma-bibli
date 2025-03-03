import React from 'react';
import { useSelector } from 'react-redux';
import SingleLibraryBook from '../../components/SingleBook/SingleLibraryBook';

function SingleBookFromLibrary({ book }) {
  const libraryBooks = useSelector((state) => state.library.libraryBooks);
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  // Find the matching book from the library database
  const libraryBook = libraryBooks.find(
    (libBook) => libBook.isbn === book.isbn
  );

  // Use library version if available, otherwise use the provided book
  const displayBook = libraryBook || book;

  return (
    <SingleLibraryBook
      book={displayBook}
      libraryBooks={libraryBooks}
      wishlistBooks={wishlistBooks}
    />
  );
}

export default SingleBookFromLibrary;
