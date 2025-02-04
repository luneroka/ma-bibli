import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import avatarImg from '../assets/avatar.png';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mon compte', href: '/compte' },
  { name: 'Se déconnecter', href: '/deconnexion' },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentUser = true;

  return (
    <header className='max-w-screen-2x1 sticky top-0 z-50 bg-main-blue overflow-hidden'>
      <nav className='flex justify-between items-center  px-6 md:px-[128px] py-[24px]'>
        {/* left side */}
        <div className='flex items-center gap-4'>
          {/* Search Input */}
          <div className='relative w-[100%] md:w-[480px]'>
            <IoSearchOutline className='absolute left-3 inset-y-0 my-auto' />
            <input
              type='text'
              placeholder='Rechercher un livre ou un auteur...'
              className='bg-white-bg w-full h-10 pl-10 pr-4 rounded-lg focus:outline-none'
            />
          </div>
          {/* Search Button */}
          <button className='hidden sm:block font-merriweather text-white-bg bg-primary-btn px-6 h-10 rounded-lg text-h6'>
            Search
          </button>
        </div>

        {/* right side */}
        <div className='flex items-center gap-4 sm:gap-6'>
          <Link to='/'>
            <FaListAlt className='w-8 h-8 text-white-bg' />
          </Link>
          <Link to='/'>
            <FaBookOpen className='w-8 h-8 text-white-bg' />
          </Link>
          <div className='flex items-center'>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=''
                    className={`size-10 rounded-full ${
                      currentUser ? 'ring-2 ring-primary-btn' : ''
                    }`}
                  />
                </button>
                {/* Show dropdowns */}
                {isDropdownOpen && (
                  <div>
                    <ul>
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link to={item.href}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to='/login'>
                <FaUser className='w-8 h-8 text-primary-btn' />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
