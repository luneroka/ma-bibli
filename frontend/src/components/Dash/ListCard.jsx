import ListItem from './ListItem';
import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

function ListCard({ variant, libraryBooks = [] }) {
  if (variant === 'recent') {
    const sortedBooks = [...libraryBooks]
      .filter((book) => book.haveRead === true && book.dateHaveRead)
      .sort((a, b) => new Date(b.dateHaveRead) - new Date(a.dateHaveRead))
      .slice(0, 5);
    return (
      <div className='h-full bg-white-bg text-center text-body min-[700px]:text-chart-title p-4 overflow-hidden shadow-lg'>
        <div className='mb-8 text-black-100'>Lus récemment</div>
        <div>
          {sortedBooks.map((book) => (
            <ListItem key={book.isbn} book={book} />
          ))}
        </div>
      </div>
    );
  } else if (variant === 'favorites') {
    const sortedBooks = [...libraryBooks]
      .filter((book) => book.isFavorite === true)
      .slice(0, 5);
    return (
      <div className='h-full bg-white-bg text-body min-[700px]:text-chart-title p-4 overflow-hidden shadow-lg'>
        <div className='flex gap-2 mb-8 justify-self-center text-black-100'>
          Coups de coeur{' '}
          <span className='text-primary-btn self-center'>
            <FaHeart />
          </span>
        </div>
        <div>
          {sortedBooks.map((book) => (
            <ListItem key={book.isbn} book={book} />
          ))}
        </div>
      </div>
    );
  }
}

ListCard.propTypes = {
  variant: PropTypes.string.isRequired,
  libraryBooks: PropTypes.array,
};

export default ListCard;
