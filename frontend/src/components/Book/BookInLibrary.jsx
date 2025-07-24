import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import { removeFromLibraryAsync } from '../../redux/features/library/libraryAsyncActions';
import { toggleFavoriteAsync } from '../../redux/features/favorites/favoritesAsyncActions';
import { toggleHaveReadAsync } from '../../redux/features/have-read/haveReadAsyncActions';
import { toggleHaveReadOptimistic } from '../../redux/features/library/librarySlice';
import { useAuth } from '../../context/AuthContext';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ChevronDownIcon,
  CheckCircleIcon,
  HeartIcon,
  PencilIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/16/solid';
import { getCoverUrl } from '../../utils/helper';
import PropTypes from 'prop-types';

function BookInLibrary({ book }) {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const isFavorite = book.isFavorite;
  const haveRead = book.haveRead;

  // State to track image loading
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRemoveFromLibrary = async (isbn) => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(removeFromLibraryAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for library add:', error);
    }
  };

  const handleFavorite = async (isbn) => {
    console.log('Toggling favorite for', isbn);
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      dispatch(toggleFavoriteAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for favorite toggle:', error);
    }
  };

  const handleHaveRead = async (isbn) => {
    if (!currentUser) return;
    // Optimistically update libraryBooks in the library slice:
    dispatch(toggleHaveReadOptimistic({ isbn }));
    try {
      const token = await currentUser.getIdToken();
      // Dispatch async call to toggle on the backend
      await dispatch(toggleHaveReadAsync({ token, isbn }));
    } catch (error) {
      console.error('Error fetching token for have read toggle:', error);
      // Optionally revert the optimistic update if needed.
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex w-[125px] h-[175px] relative flex-shrink-0 items-center justify-center'>
        {/* Spinner while image is loading */}
        {!imageLoaded && (
          <FaSpinner className='animate-spin text-xl text-black-50 absolute inset-0 m-auto' />
        )}
        <Link to={`/livres/${book.isbn}`}>
          <img
            src={getCoverUrl(book.cover)}
            alt='Book Cover'
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full cursor-pointer hover:scale-105 transition-all duration-200 ${
              !imageLoaded ? 'hidden' : ''
            }`}
            style={{ width: '125px', height: '175px' }}
          />
        </Link>

        {isFavorite && (
          <button
            onClick={() => handleFavorite(book.isbn)}
            className='text-primary-btn absolute top-2 right-2 rounded-full shadow-md cursor-pointer hover:scale-150 transition-all duration-200'
          >
            <FaHeart className='size-5' />
          </button>
        )}
      </div>

      {!haveRead ? (
        <Menu>
          <MenuButton className='inline-flex items-center justify-center gap-2 cursor-pointer bg-black-10 text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn hover:text-white-100 w-[125px] focus:outline-none'>
            Gérer
            <ChevronDownIcon className='size-4' />
          </MenuButton>

          <MenuItems
            transition
            anchor='bottom end'
            className='bg-white shadow-lg focus:outline-none z-50'
          >
            <MenuItem>
              <button
                onClick={() => handleHaveRead(book.isbn)}
                className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <CheckCircleIcon className='size-4 fill-secondary-btn' />
                  J&apos;ai lu !
                </div>
              </button>
            </MenuItem>
            <MenuItem>
              <Link to={`/livres/${book.isbn}/edit`} state={{ book }}>
                <button className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-75'>
                  <div className='flex gap-1 items-center justify-center text-xs'>
                    <PencilIcon className='size-4' />
                    Modifier
                  </div>
                </button>
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => handleRemoveFromLibrary(book.isbn)}
                className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-75'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <TrashIcon className='size-4 fill-red-500' />
                  Supprimer
                </div>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : (
        <Menu>
          <MenuButton className='inline-flex items-center justify-center gap-2 cursor-pointer bg-black-10 text-black-75 text-xs px-1 py-1.5 hover:bg-secondary-btn hover:text-white-75 w-[125px] focus:outline-none'>
            Gérer
            <ChevronDownIcon className='size-4' />
          </MenuButton>
          <MenuItems
            transition
            anchor='bottom end'
            className='bg-white shadow-lg focus:outline-none z-50'
          >
            <MenuItem>
              <button
                onClick={() => handleFavorite(book.isbn)}
                className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <HeartIcon
                    className={`size-4 ${isFavorite ? 'fill-primary-btn' : ''}`}
                  />
                  Coup de coeur
                </div>
              </button>
            </MenuItem>
            <MenuItem>
              <Link to={`/livres/${book.isbn}/edit`} state={{ book }}>
                <button className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-100'>
                  <div className='flex gap-1 items-center justify-center text-xs'>
                    <PencilIcon className='size-4' />
                    Modifier
                  </div>
                </button>
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => handleHaveRead(book.isbn)}
                className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <ExclamationCircleIcon className='size-4 fill-yellow-500' />
                  Pas encore lu !
                </div>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => handleRemoveFromLibrary(book.isbn)}
                className='group flex cursor-pointer bg-white-100 text-black-75 text-xs px-1 py-1.5 hover:bg-black-10 hover:text-black w-[125px] active:bg-black-75 active:text-white-100'
              >
                <div className='flex gap-1 items-center justify-center text-xs'>
                  <TrashIcon className='size-4 fill-red-500' />
                  Supprimer
                </div>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
    </div>
  );
}

BookInLibrary.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    cover: PropTypes.string,
    isFavorite: PropTypes.bool,
    haveRead: PropTypes.bool,
  }).isRequired,
};

export default BookInLibrary;
