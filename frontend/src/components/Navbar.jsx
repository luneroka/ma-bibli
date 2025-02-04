import React from 'react';
import { Link } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <header className='max-w-screen-2x1 mx-[128px] px-4 py-6'>
      <nav className='flex justify-between items-center'>
        {/* left side */}
        <div>
          {/* Search Input */}
          <div>
            <IoSearchOutline />
            <input
              type='text'
              placeholder='Rechercher un livre ou un auteur...'
              className='bg-white-bg w-full py-1 md:px-8 px-6 round-md focus:outline-none'
            />
          </div>
        </div>

        {/* right side */}
        <div>
          <Link to='/'>
            <FaListAlt className='w-[32px] h-[32px] text-primary-btn' />
          </Link>
          <Link to='/'>
            <FaBookOpen className='w-[32px] h-[32px] text-primary-btn' />
          </Link>
          <Link to='/'>
            <FaUser className='w-[32px] h-[32px] text-primary-btn' />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
