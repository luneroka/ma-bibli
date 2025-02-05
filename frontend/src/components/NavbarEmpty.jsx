import React from 'react';
import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';

function NavbarEmpty() {
  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[96px]'>
      <nav className='flex justify-between items-center  px-[64px] md:px-[128px] py-[24px]'>
        {/* left side */}
        <div className='flex items-center gap-4'>
          {/* Search Input */}
          <Link to='/'>
            <IoHome className='cursor-pointer w-8 h-8 text-white-bg hover:text-primary-btn' />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavbarEmpty;
