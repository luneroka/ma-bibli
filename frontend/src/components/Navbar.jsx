import React from 'react';
import { Link } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className='max-w-screen-2x1 mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>
        {/* left side */}
        <div></div>

        {/* right side */}
        <div>
          <Link to='/'>
            <FaListAlt />
          </Link>
          <Link to='/'>
            <FaBookOpen />
          </Link>
          <Link to='/'>A</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
