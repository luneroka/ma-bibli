import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SingleGoogleBook from '../../components/SingleBook/SingleGoogleBook';
import SmallGoogleBook from '../../components/SingleBook/SmallGoogleBook';

function SingleBookFromGoogle({ book }) {
  const wishlistBooks = useSelector((state) => state.wishlist.wishlistBooks);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 752);

  // Add effect to update screen size state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 752);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <SmallGoogleBook
          book={book}
          wishlistBooks={wishlistBooks}
          isInLibrary={false}
        />
      ) : (
        <SingleGoogleBook
          book={book}
          wishlistBooks={wishlistBooks}
          isInLibrary={false}
        />
      )}
    </>
  );
}

export default SingleBookFromGoogle;
