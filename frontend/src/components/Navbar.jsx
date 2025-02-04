import React from 'react';
import { Link } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <header className='max-w-screen-2x1 sticky top-0 z-50'>
      <nav className='flex justify-between items-center bg-main-blue  px-[128px] py-[32px]'>
        {/* left side */}
        <div className='flex items-center md:gap-4'>
          {/* Search Input */}
          <div className='relative w-full min-w-[480px] max-w-[480px]'>
            <IoSearchOutline className='absolute inline-block left-3 inset-y-0 my-auto' />
            <input
              type='text'
              placeholder='Rechercher un livre ou un auteur...'
              className='bg-white-bg w-full h-10 pl-10 pr-4 rounded-lg focus:outline-none'
            />
          </div>
          {/* Search Button */}
          <button className='font-merriweather text-white-bg bg-primary-btn px-6 h-10 rounded-lg text-h6'>
            Search
          </button>
        </div>

        {/* right side */}
        <div className='flex justify-between items-center gap-[24px]'>
          <Link to='/'>
            <FaListAlt className='w-[24px] h-[24px] text-white-bg' />
          </Link>
          <Link to='/'>
            <FaBookOpen className='w-[24px] h-[24px] text-white-bg' />
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
