import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaListAlt, FaBookOpen, FaUser } from 'react-icons/fa';
import { IoSearchOutline, IoHome } from 'react-icons/io5';
import avatarImg from '../../assets/avatar.png';
import { useDispatch } from 'react-redux';
import { createSearchBooksAsync } from '../../redux/features/search/searchAsyncActions';
import { useAuth } from '../../context/AuthContext';
import DropdownMenu from './DropdownMenu';

const NavbarSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialSearchTerm = location.state?.searchTerm || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state?.searchTerm]);

  const handleSearch = async () => {
    await dispatch(
      createSearchBooksAsync('searchBooks', '/api/search/books')(searchTerm)
    );
    navigate('/recherche', { state: { searchTerm } });
  };

  // Enable Search Form action with Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px] items-center'>
      <nav className='flex justify-between items-center px-[64px] md:px-[128px] py-[17px]'>
        {/* Left side */}
        <Link to='/'>
          <IoHome className='cursor-pointer w-6 h-6 text-white-bg hover:text-primary-btn' />
        </Link>

        {/* Middle */}
        <div className='flex items-center gap-4'>
          <div className='relative w-[100%] md:w-[480px]'>
            <IoSearchOutline className='absolute left-3 inset-y-0 my-auto' />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Rechercher un livre ou un auteur...'
              className='bg-white-bg w-full h-8 pl-10 pr-4 text-small md:text-body focus:outline-none focus:ring-2 focus:ring-primary-btn placeholder:text-small'
            />
          </div>
          <button
            onClick={handleSearch}
            className='cursor-pointer hidden sm:block font-merriweather text-white-bg bg-primary-btn px-6 h-8 text-small hover:bg-secondary-btn active:bg-black-75'
          >
            Rechercher
          </button>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4 sm:gap-6'>
          {/* Reading List Icon */}
          <Link to='/liste-de-lecture'>
            <FaListAlt className='w-6 h-6 text-white-bg hover:text-primary-btn' />
          </Link>

          {/* Library Icon */}
          <Link to='/bibli'>
            <FaBookOpen className='w-6 h-6 text-white-bg hover:text-primary-btn' />
          </Link>

          {/* User Icon and dropdown */}
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
                    className={`size-8 rounded-full ${
                      currentUser
                        ? 'ring-2 ring-white-bg hover:ring-primary-btn'
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
                <FaUser className='w-6 h-6 text-white-bg hover:text-primary-btn' />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarSearch;
