import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListItem({ book }) {
  const authorsFormatted = book.authors.slice(0, 2).join(', ');

  return (
    <div className='text-start flex flex-col m-0'>
      <div className='pl-2 text-black-100 text-small-body font-light'>
        <Link to={`/livres/${book.isbn}`}>
          {book.title.length > 42
            ? `${book.title.slice(0, 42)}...`
            : book.title}
        </Link>
      </div>
      <div className='flex pl-2 text-black-75 text-small font-light'>
        {authorsFormatted.length > 40
          ? `${authorsFormatted.slice(0, 40)}...`
          : authorsFormatted}
      </div>
      <hr className='text-secondary-btn my-3 opacity-50' />
    </div>
  );
}

ListItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isbn: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ListItem;
