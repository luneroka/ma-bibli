import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaListAlt, FaBookOpen, FaUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import avatarImg from '../../assets/avatar.png';
import { createSearchBooksAsync } from '../../redux/features/search/searchAsyncActions';
import { useAuth } from '../../context/AuthContext';
import DropdownMenu from './DropdownMenu';
import ThemeSwitcher from '../ThemeSwitcher';
import { getApiPath } from '../../utils/apiConfig';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm) {
      await dispatch(
        createSearchBooksAsync(
          'searchBooks',
          getApiPath('/api/search/books')
        )(searchTerm)
      );
      navigate('/recherche', { state: { searchTerm } });
    }
  };

  // Submit search form with 'Enter' key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px] items-center'>
      <nav className='flex justify-between items-center px-[32px] sm:px-[64px] md:px-[128px] py-[17px]'>
        {/* Left side */}
        <div className='flex items-center gap-4'>
          {/* Search Form */}
          <div className='relative xs:w-[350px] sm:w-[480px]'>
            <IoSearchOutline className='absolute left-3 inset-y-0 my-auto' />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Rechercher un livre...'
              className='bg-white w-full h-7 xs:h-8 pl-10 pr-4 text-small md:text-body focus:outline-none focus:ring-2 focus:ring-primary-btn placeholder:text-small'
            />
          </div>

          <button
            onClick={handleSearch}
            className='cursor-pointer hidden md:block font-merriweather text-white bg-primary-btn px-6 h-8 text-small hover:bg-secondary-btn active:bg-black-75'
          >
            Rechercher
          </button>
        </div>

        {/* Middle */}
        {/* Change Theme */}
        <div className='text-white text-xs font-merriweather border border-white rounded focus:outline-none p-1 hidden min-[1330px]:block'>
          <ThemeSwitcher />
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4 sm:gap-6'>
          {/* Wishlist Icon */}
          <Link to='/wishlist'>
            <FaListAlt className='size-5 xs:size-6 text-white hover:text-primary-btn' />
          </Link>

          {/* Library Icon */}
          <Link to='/bibli'>
            <FaBookOpen className='size-5 xs:size-6 text-white hover:text-primary-btn' />
          </Link>

          {/* User displayName */}
          {currentUser && currentUser.displayName && (
            <div className='text-white font-merriweather hidden md:block'>
              {currentUser.displayName}
            </div>
          )}

          {/* User icon and dropdown */}
          <div className='relative flex items-center' ref={dropdownRef}>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='cursor-pointer'
                >
                  <img
                    src={
                      currentUser.photoURL ? currentUser.photoURL : avatarImg
                    }
                    alt=''
                    className={`size-6 xs:size-8 rounded-full ${
                      currentUser
                        ? 'ring-2 ring-white hover:ring-primary-btn'
                        : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <DropdownMenu
                    closeDropdown={() => setIsDropdownOpen(false)}
                  />
                )}
              </>
            ) : (
              <Link to='/login'>
                <FaUser className='size-5 xs:size-6 text-white hover:text-primary-btn' />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
