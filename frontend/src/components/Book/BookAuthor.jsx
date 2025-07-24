import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatNumber, extractYear, getCoverUrl } from '../../utils/helper';
import PropTypes from 'prop-types';

function BookAuthor({ book }) {
  const navigate = useNavigate();
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth < 640);

  // Handle screen size changes
  useEffect(() => {
    function handleResize() {
      setIsXsScreen(window.innerWidth < 640);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle author click
  const handleAuthorClick = (author) => {
    navigate('/recherche', {
      state: { searchTerm: author, searchType: 'author' },
    });
  };

  // Process cover URL
  const coverUrl = getCoverUrl(book.cover);

  return (
    <>
      <div id='book-card' className='flex flex-col justify-between'>
        <div className='flex gap-[24px]'>
          {/* Book Cover */}
          <div className='flex w-[121px] h-[170px] flex-shrink-0 items-center'>
            {isXsScreen ? (
              <img
                src={coverUrl}
                alt='Couverture non disponible'
                className='w-full h-full'
                style={{ width: '121px', height: '170px' }}
              />
            ) : (
              <Link to={`/livres/${book.isbn}`}>
                <img
                  src={coverUrl}
                  alt='Couverture non disponible'
                  className='w-full h-full cursor-pointer hover:scale-105 transition-all duration-200'
                  style={{ width: '121px', height: '170px' }}
                />
              </Link>
            )}
          </div>

          {/* Book Details */}
          <div className='flex flex-col justify-center w-[220px] h-[170px]'>
            {/* Title */}
            <Link to={`/livres/${book.isbn}`}>
              <p className='text-small-body text-black-75 hover:text-black font-bold leading-4.5 overflow-hidden mb-2 text-pretty'>
                {book.title.length > 40
                  ? `${book.title.slice(0, 40)}...`
                  : book.title}
              </p>
            </Link>

            {/* Authors */}
            <div>
              {book.authors &&
                book.authors.slice(0, 2).map((author) => (
                  <p
                    key={author}
                    className='text-small text-black-75 cursor-pointer hover:text-secondary-btn hover:underline overflow-hidden'
                    onClick={() => handleAuthorClick(author)}
                  >
                    {author.length > 30 ? `${author.slice(0, 30)}...` : author}
                  </p>
                ))}
            </div>

            {/* Publisher */}
            <div className='text-small text-black-50'>
              {book.publisher && book.publisher.length > 15
                ? `${book.publisher.slice(0, 30)}...`
                : book.publisher}
            </div>

            {/* Published Date */}
            <p className='text-small text-black-50'>
              Publication : {extractYear(book.publishedDate)}
            </p>

            {/* Page Count */}
            <p className='text-small text-black-50'>
              Pages : {formatNumber(book.pageCount)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
BookAuthor.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    publisher: PropTypes.string,
    publishedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageCount: PropTypes.number,
  }).isRequired,
};

export default BookAuthor;
