import React, { useState, useRef, useEffect } from 'react';
import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaListAlt, FaBookOpen, FaUser } from 'react-icons/fa';
import avatarImg from '../../assets/avatar.png';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mon compte', href: '/mon-compte' },
  { name: 'Se déconnecter', href: '/logout' },
];

function NavbarUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

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
          {/* Display Name */}
          {currentUser && currentUser.displayName ? (
            <div className='text-white-bg font-merriweather'>
              {currentUser.displayName}
            </div>
          ) : (
            ''
          )}

          {/* User Icon */}
          <div className='relative flex items-center' ref={dropdownRef}>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='cursor-pointer'
                >
                  <img
                    src={
                      currentUser && currentUser.photoURL
                        ? currentUser.photoURL
                        : avatarImg
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
                  <div className='absolute right-0 mt-50 w-40 bg-white shadow-lg rounded-sm z-50'>
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
                            <div>
                              <hr className='text-black-10 w-[90%] justify-self-center' />
                              <span className='text-black-75 block px-4 py-3 text-sm cursor-pointer hover:text-primary-btn hover:font-extrabold'>
                                {item.name}
                              </span>
                            </div>
                          ) : (
                            <Link
                              to={item.href}
                              className=' text-black-75 block px-4 py-3 text-sm hover:text-primary-btn hover:font-extrabold'
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

export default NavbarUser;
