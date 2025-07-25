import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaListAlt, FaBookOpen, FaUser } from 'react-icons/fa';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import { CiBarcode } from "react-icons/ci";
import avatarImg from '../../assets/avatar.png';
import { createSearchBooksAsync } from '../../redux/features/search/searchAsyncActions';
import { useAuth } from '../../context/AuthContext';
import DropdownMenu from './DropdownMenu';
import ThemeSwitcher from '../ThemeSwitcher';
import { getApiPath } from '../../utils/apiConfig';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 752);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 752);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[64px] xs:h-[70px] items-center'>
      {isSearchOpen ? (
        <nav className='flex gap-2 items-center px-[32px] sm:px-[64px] md:px-[128px] py-[17px]'>
          <div className='w-full'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Rechercher un livre...'
              className='bg-white w-full h-8 pl-4 text-body focus:outline-none focus:ring-2 focus:ring-primary-btn placeholder:text-small'
            />
          </div>

          <button
            onClick={handleSearch}
            className='cursor-pointer flex font-merriweather text-white bg-primary-btn h-8 w-12 text-h5 hover:bg-secondary-btn active:bg-black-75 justify-center items-center'
          >
            <IoSearchOutline />
          </button>

          <button
            onClick={toggleSearch}
            className='cursor-pointer flex font-merriweather text-white bg-primary-btn h-8 w-12 text-h5 hover:bg-secondary-btn active:bg-black-75 justify-center items-center'
          >
            <IoCloseOutline />
          </button>
        </nav>
      ) : (
        <nav className='flex justify-between items-center px-[32px] sm:px-[64px] md:px-[128px] py-[17px]'>
          {/* Left side */}
          <div className='flex gap-4'>
            {/* Search Form: only render input on sm and up */}
            { !isMobile && (
              <div className='sm:w-[350px] md:w-[480px]'>
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Rechercher un livre...'
                  className='bg-white w-full h-7 xs:h-8 pl-4 xs:pl-6 pr-4 text-small md:text-body focus:outline-none focus:ring-2 focus:ring-primary-btn placeholder:text-small'
                />
              </div>
            )}

            <button
              onClick={isMobile ? toggleSearch : handleSearch}
              className='cursor-pointer flex font-merriweather text-white bg-primary-btn h-8 w-12 text-h5 hover:bg-secondary-btn active:bg-black-75 justify-center items-center'
            >
              <IoSearchOutline />
            </button>

            <button
              className='cursor-pointer flex font-merriweather text-white bg-primary-btn h-8 w-12 text-h4 hover:bg-secondary-btn active:bg-black-75 justify-center items-center'
            >
              <CiBarcode />
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
              <FaListAlt className='size-6 text-white hover:text-primary-btn' />
            </Link>

            {/* Library Icon */}
            <Link to='/bibli'>
              <FaBookOpen className='size-6 text-white hover:text-primary-btn' />
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
                      className={`size-8 rounded-full ${
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
                  <FaUser className='size-6 text-white hover:text-primary-btn' />
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
