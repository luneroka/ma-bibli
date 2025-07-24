import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SingleApiBook from '../../components/SingleBook/SingleApiBook';
import SmallApiBook from '../../components/SingleBook/SmallApiBook';

function SingleBookFromApi({ book }) {
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
        <SmallApiBook
          book={book}
          wishlistBooks={wishlistBooks}
          isInLibrary={false}
        />
      ) : (
        <SingleApiBook
          book={book}
          wishlistBooks={wishlistBooks}
          isInLibrary={false}
        />
      )}
    </>
  );
}

SingleBookFromApi.propTypes = {
  book: PropTypes.object.isRequired,
};

export default SingleBookFromApi;
