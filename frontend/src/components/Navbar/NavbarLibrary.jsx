import React from 'react';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import avatarImg from '../../assets/avatar.png';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mon compte', href: '/mon-compte' },
  { name: 'Se déconnecter', href: '/logout' },
];

function NavbarLibrary() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px] items-center'>
      <nav className='flex justify-between items-center px-[64px] md:px-[128px] py-[17px] h-full'>
        {/* Left side */}
        <div className='flex items-center gap-4'>
          {/* Home Icon */}
          <Link to='/'>
            <IoHome className='cursor-pointer w-6 h-6 text-white-bg hover:text-primary-btn' />
          </Link>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4 sm:gap-6'>
          {/* Reading List icon */}
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
                          onClick={() => {
                            setIsDropdownOpen(false);
                            if (item.name === 'Se déconnecter') {
                              handleLogout();
                            }
                          }}
                        >
                          {item.name === 'Se déconnecter' ? (
                            <span className='block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer'>
                              {item.name}
                            </span>
                          ) : (
                            <Link
                              to={item.href}
                              className='block px-4 py-3 text-sm hover:bg-gray-100'
                            >
                              {item.name}
                            </Link>
                          )}
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
}

export default NavbarLibrary;
