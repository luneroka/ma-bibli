import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import avatarImg from '../../assets/avatar.png';
import { useAuth } from '../../context/AuthContext';
import DropdownMenu from './DropdownMenu';
import MaBibliLogo from '../MaBibliLogo';

function NavbarUser() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useAuth();

  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px] items-center'>
      <nav className='flex justify-between items-center px-[32px] sm:px-[64px] md:px-[128px] py-[17px] h-full'>
        {/* Left side */}
        <div className='flex items-center gap-4'>
          {/* Home Icon */}
          <Link to='/'>
            {/* <IoHome className='cursor-pointer size-7 text-white hover:text-primary-btn' /> */}
            <MaBibliLogo width={28} height={28} />
          </Link>
        </div>

        {/* Right side */}
        <div className='flex items-center gap-4 sm:gap-6'>
          {/* Display Name */}
          {currentUser && currentUser.displayName ? (
            <div className='text-white font-merriweather'>
              {currentUser.displayName}
            </div>
          ) : (
            ''
          )}

          {/* User Icon with Dropdown Menu */}
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
    </header>
  );
}

export default NavbarUser;
