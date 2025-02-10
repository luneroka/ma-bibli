import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import avatarImg from '../assets/avatar.png';
import { createSearchBooksAsync } from '../utils/asyncActions';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mon compte', href: '/mon-compte' },
  { name: 'Se déconnecter', href: '/logout' },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm) {
      await dispatch(
        createSearchBooksAsync('search', '/api/search')(searchTerm)
      );
      navigate('/recherche', { state: { searchTerm } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px] items-center'>
      <nav className='flex justify-between items-center px-[64px] md:px-[128px] py-[17px]'>
        {/* Left side */}
        <div action='' className='flex items-center gap-4'>
          {/* Search Input */}
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

          {/* Search Button */}
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

          {/* User Icon */}
          <div className='relative flex items-center'>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='cursor-pointer'
                >
                  <img
                    src={avatarImg}
                    alt=''
                    className={`size-8 rounded-full ${
                      currentUser
                        ? 'ring-2 ring-white-bg hover:ring-primary-btn'
                        : ''
                    }`}
                  />
                </button>
                {/* Show dropdowns */}
                {isDropdownOpen && (
                  <div className='absolute right-0 mt-50 w-40 bg-white-bg shadow-lg rounded-md z-50'>
                    <ul className='py-2'>
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className='block px-4 py-3 text-sm hover:bg-gray-100'
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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

export default Navbar;
