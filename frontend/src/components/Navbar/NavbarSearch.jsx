import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaListAlt, FaBookOpen, FaUser } from 'react-icons/fa';
import { IoSearchOutline, IoCloseOutline, IoHome } from 'react-icons/io5';
import { CiBarcode } from 'react-icons/ci';
import avatarImg from '../../assets/avatar.png';
import { useDispatch } from 'react-redux';
import { createSearchBooksAsync } from '../../redux/features/search/searchAsyncActions';
import { useAuth } from '../../context/AuthContext';
import DropdownMenu from './DropdownMenu';
import BarcodeScanner from './BarcodeScanner';
import { getApiPath } from '../../utils/apiConfig';

const NavbarSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialSearchTerm = location.state?.searchTerm || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (location.state?.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state?.searchTerm]);

  // Search from input
  const handleInputSearch = async () => {
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

  // Search from barcode scanner
  const handleBarcodeSearch = async (isbn) => {
    if (isbn) {
      try {
        const res = await fetch(getApiPath(`/api/books/${isbn}`));
        const book = await res.json();
        navigate(`/livres/${isbn}`, { state: { book } });
      } catch (err) {
        navigate('/recherche', {
          state: { searchTerm: isbn, error: 'Livre non trouvé.' },
        });
      }
    }
  };

  // Submit search form with 'Enter' key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputSearch();
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleBarcodeDetected = (code) => {
    setSearchTerm(code);
    setIsScannerOpen(false);
    handleBarcodeSearch(code);
  };

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
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px] items-center'>
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
            onClick={handleInputSearch}
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
        <nav className='flex justify-between items-center px-[32px] sm:px-[64px] lg:px-[128px] py-[17px]'>
          {/* Left side */}
          <Link to='/'>
            <IoHome className='cursor-pointer size-7 text-white hover:text-primary-btn' />
          </Link>

          {/* Middle */}
          <div className='flex items-center gap-4'>
            {/* Search Form: only render input on sm and up */}
            {!isMobile && (
              <div className='sm:w-[300px]'>
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
              onClick={isMobile ? toggleSearch : handleInputSearch}
              className='cursor-pointer flex font-merriweather text-white bg-primary-btn h-8 w-12 text-h5 hover:bg-secondary-btn active:bg-black-75 justify-center items-center'
            >
              <IoSearchOutline />
            </button>

            <button
              onClick={() => setIsScannerOpen(true)}
              className='cursor-pointer flex font-merriweather text-white bg-primary-btn h-8 w-12 text-h4 hover:bg-secondary-btn active:bg-black-75 justify-center items-center'
            >
              <CiBarcode />
            </button>
          </div>

          {/* Right side */}
          <div className='flex items-center gap-4'>
            {/* Wishlist Icon */}
            <Link to='/wishlist'>
              <FaListAlt className='size-6 text-white hover:text-primary-btn' />
            </Link>

            {/* Library Icon */}
            <Link to='/bibli'>
              <FaBookOpen className='size-6 text-white hover:text-primary-btn' />
            </Link>

            {/* Display Name */}
            {currentUser && currentUser.displayName ? (
              <div className='text-white font-merriweather hidden min-[880px]:block'>
                {currentUser.displayName}
              </div>
            ) : (
              ''
            )}

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
                  <FaUser className='w-6 h-6 text-white hover:text-primary-btn' />
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      {isScannerOpen && (
        <BarcodeScanner
          onDetected={handleBarcodeDetected}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </header>
  );
};

export default NavbarSearch;
